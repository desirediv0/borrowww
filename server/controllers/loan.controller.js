import { prisma } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponsive } from "../utils/ApiResponsive.js";

/**
 * Get all loans (Admin only)
 * GET /api/loans
 */
export const getAllLoans = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, purpose, type } = req.query;

  // Build where clause
  const where = {};

  if (
    status &&
    [
      "PENDING",
      "UNDER_REVIEW",
      "APPROVED",
      "REJECTED",
      "DISBURSED",
      "CLOSED",
    ].includes(status)
  ) {
    where.status = status;
  }

  if (purpose) {
    where.purpose = {
      contains: purpose,
      mode: "insensitive",
    };
  }

  if (
    type &&
    ["HOME", "PERSONAL", "CAR", "BUSINESS", "EDUCATION"].includes(type)
  ) {
    where.type = type;
  }

  const [loans, totalCount] = await Promise.all([
    prisma.loan.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    }),
    prisma.loan.count({ where }),
  ]);

  res.status(200).json(
    new ApiResponsive(
      200,
      {
        loans,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount,
          pages: Math.ceil(totalCount / parseInt(limit)),
        },
      },
      "Loans retrieved successfully"
    )
  );
});

/**
 * Create loan application (User)
 * POST /api/loans/apply
 */
export const applyForLoan = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const {
    type,
    amount,
    interestRate,
    duration,
    purpose,
    monthlyIncome,
    employmentType,
    documents,
    remarks,
  } = req.body;

  // Validate required fields
  if (!type || !amount || !purpose) {
    throw new ApiError(400, "Type, amount, and purpose are required");
  }

  // Validate loan type
  if (!["HOME", "PERSONAL", "CAR", "BUSINESS", "EDUCATION"].includes(type)) {
    throw new ApiError(400, "Invalid loan type");
  }

  // Create loan application
  const loan = await prisma.loan.create({
    data: {
      userId,
      type,
      amount: parseFloat(amount),
      interestRate: interestRate ? parseFloat(interestRate) : null,
      duration: duration ? parseInt(duration) : null,
      purpose,
      monthlyIncome: monthlyIncome ? parseFloat(monthlyIncome) : null,
      employmentType,
      documents: documents || {},
      remarks,
      status: "PENDING",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  res
    .status(201)
    .json(
      new ApiResponsive(
        201,
        { loan },
        "Loan application submitted successfully"
      )
    );
});

/**
 * Get user's loans
 * GET /api/loans/my-loans
 */
export const getUserLoans = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { page = 1, limit = 10 } = req.query;

  const [loans, totalCount] = await Promise.all([
    prisma.loan.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    }),
    prisma.loan.count({ where: { userId } }),
  ]);

  res.status(200).json(
    new ApiResponsive(
      200,
      {
        loans,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount,
          pages: Math.ceil(totalCount / parseInt(limit)),
        },
      },
      "User loans retrieved successfully"
    )
  );
});

/**
 * Update loan status (Admin only)
 * PUT /api/loans/:id/status
 */
export const updateLoanStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, remarks } = req.body;

  // Validate status
  if (
    ![
      "PENDING",
      "UNDER_REVIEW",
      "APPROVED",
      "REJECTED",
      "DISBURSED",
      "CLOSED",
    ].includes(status)
  ) {
    throw new ApiError(400, "Invalid loan status");
  }

  // Check if loan exists
  const existingLoan = await prisma.loan.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!existingLoan) {
    throw new ApiError(404, "Loan not found");
  }

  // Prepare update data
  const updateData = {
    status,
    ...(remarks && { remarks }),
  };

  // Add timestamps for status changes
  if (status === "APPROVED") {
    updateData.approvedAt = new Date();
  } else if (status === "REJECTED") {
    updateData.rejectedAt = new Date();
  }

  const updatedLoan = await prisma.loan.update({
    where: { id },
    data: updateData,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  res
    .status(200)
    .json(
      new ApiResponsive(
        200,
        { loan: updatedLoan },
        "Loan status updated successfully"
      )
    );
});

/**
 * Get loan by ID (Admin only)
 * GET /api/loans/:id
 */
export const getLoanById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const loan = await prisma.loan.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          isVerified: true,
          cibilCheckCount: true,
        },
      },
    },
  });

  if (!loan) {
    throw new ApiError(404, "Loan not found");
  }

  res
    .status(200)
    .json(
      new ApiResponsive(200, { loan }, "Loan details retrieved successfully")
    );
});

/**
 * Get loan statistics (Admin only)
 * GET /api/loans/stats
 */
export const getLoanStats = asyncHandler(async (req, res) => {
  const [
    totalLoans,
    pendingLoans,
    approvedLoans,
    rejectedLoans,
    underReviewLoans,
    disbursedLoans,
    totalAmount,
    averageAmount,
    applicationsToday,
    amountRanges,
  ] = await Promise.all([
    // Total loans
    prisma.loan.count(),

    // Pending loans
    prisma.loan.count({ where: { status: "PENDING" } }),

    // Approved loans
    prisma.loan.count({ where: { status: "APPROVED" } }),

    // Rejected loans
    prisma.loan.count({ where: { status: "REJECTED" } }),

    // Under review loans
    prisma.loan.count({ where: { status: "UNDER_REVIEW" } }),

    // Disbursed loans
    prisma.loan.count({ where: { status: "DISBURSED" } }),

    // Total amount
    prisma.loan.aggregate({
      where: { amount: { not: null } },
      _sum: { amount: true },
    }),

    // Average amount
    prisma.loan.aggregate({
      where: { amount: { not: null } },
      _avg: { amount: true },
    }),

    // Applications today
    prisma.loan.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),

    // Amount ranges
    Promise.all([
      prisma.loan.count({ where: { amount: { lt: 50000 } } }),
      prisma.loan.count({ where: { amount: { gte: 50000, lt: 200000 } } }),
      prisma.loan.count({ where: { amount: { gte: 200000, lt: 1000000 } } }),
      prisma.loan.count({ where: { amount: { gte: 1000000 } } }),
    ]),
  ]);

  const stats = {
    totalLoans,
    pendingLoans,
    approvedLoans,
    rejectedLoans,
    underReviewLoans,
    disbursedLoans,
    totalAmount: totalAmount._sum.amount || 0,
    averageAmount: averageAmount._avg.amount || 0,
    applicationsToday,
    amountRanges: {
      small: amountRanges[0],
      medium: amountRanges[1],
      large: amountRanges[2],
      xlarge: amountRanges[3],
    },
  };

  res
    .status(200)
    .json(
      new ApiResponsive(
        200,
        { stats },
        "Loan statistics retrieved successfully"
      )
    );
});

/**
 * Get loan type distribution (Admin only)
 * GET /api/loans/type-distribution
 */
export const getLoanTypeDistribution = asyncHandler(async (req, res) => {
  const distribution = await prisma.loan.groupBy({
    by: ["type"],
    _count: {
      type: true,
    },
  });

  res
    .status(200)
    .json(
      new ApiResponsive(
        200,
        { distribution },
        "Loan type distribution retrieved successfully"
      )
    );
});

/**
 * Get recent loan applications (Admin only)
 * GET /api/loans/recent
 */
export const getRecentLoans = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;

  const recentLoans = await prisma.loan.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: parseInt(limit),
  });

  res
    .status(200)
    .json(
      new ApiResponsive(
        200,
        { loans: recentLoans },
        "Recent loans retrieved successfully"
      )
    );
});

/**
 * Update loan (Admin only)
 * PUT /api/loans/:id
 */
export const updateLoan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { purpose, remarks, amount, interestRate, duration } = req.body;

  // Check if loan exists
  const existingLoan = await prisma.loan.findUnique({
    where: { id },
  });

  if (!existingLoan) {
    throw new ApiError(404, "Loan not found");
  }

  // Prepare update data
  const updateData = {};
  if (purpose) updateData.purpose = purpose;
  if (remarks !== undefined) updateData.remarks = remarks;
  if (amount) updateData.amount = parseFloat(amount);
  if (interestRate) updateData.interestRate = parseFloat(interestRate);
  if (duration) updateData.duration = parseInt(duration);

  const updatedLoan = await prisma.loan.update({
    where: { id },
    data: updateData,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
    },
  });

  res
    .status(200)
    .json(
      new ApiResponsive(200, { loan: updatedLoan }, "Loan updated successfully")
    );
});

/**
 * Delete loan (Admin only)
 * DELETE /api/loans/:id
 */
export const deleteLoan = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if loan exists
  const existingLoan = await prisma.loan.findUnique({
    where: { id },
  });

  if (!existingLoan) {
    throw new ApiError(404, "Loan not found");
  }

  // Delete the loan
  await prisma.loan.delete({
    where: { id },
  });

  res.status(200).json(new ApiResponsive(200, {}, "Loan deleted successfully"));
});
