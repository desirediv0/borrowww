import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@borrowww.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@borrowww.com",
      password: adminPassword,
      userType: "ADMIN",
      isVerified: true,
      isActive: true,
    },
  });

  // Create sample users
  const users = [];
  const userNames = [
    "Rahul Sharma",
    "Priya Patel",
    "Amit Kumar",
    "Neha Singh",
    "Rajesh Verma",
    "Sneha Gupta",
    "Vikram Malhotra",
    "Anjali Reddy",
    "Suresh Iyer",
    "Meera Joshi",
  ];

  for (let i = 0; i < userNames.length; i++) {
    const user = await prisma.user.upsert({
      where: { email: `user${i + 1}@example.com` },
      update: {},
      create: {
        name: userNames[i],
        email: `user${i + 1}@example.com`,
        phone: `98765${String(i + 1).padStart(5, "0")}`,
        userType: "USER",
        isVerified: Math.random() > 0.3,
        isActive: true,
        cibilCheckCount: Math.floor(Math.random() * 5),
        lastLogin: new Date(
          Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
        ),
        createdAt: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ),
      },
    });
    users.push(user);
  }

  // Create sample CIBIL data
  for (let i = 0; i < 25; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const isSubmitted = Math.random() > 0.4;
    const score = isSubmitted ? Math.floor(Math.random() * 300) + 300 : null;

    await prisma.cibilData.create({
      data: {
        userId: user.id,
        score,
        panNumber: isSubmitted
          ? `ABCDE${String(i + 1).padStart(5, "0")}F`
          : null,
        phoneNumber: user.phone,
        source: "CIBIL_API",
        reportData: isSubmitted ? { score, timestamp: new Date() } : null,
        status: isSubmitted ? "SUBMITTED" : "UNSUBMITTED",
        isSubmitted,
        fetchedAt: isSubmitted ? new Date() : null,
        expiresAt: isSubmitted
          ? new Date(Date.now() + 28 * 24 * 60 * 60 * 1000)
          : null,
        createdAt: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ),
      },
    });
  }

  // Create sample loans
  const loanTypes = ["HOME", "PERSONAL", "CAR", "BUSINESS", "EDUCATION"];
  const loanStatuses = [
    "PENDING",
    "UNDER_REVIEW",
    "APPROVED",
    "REJECTED",
    "DISBURSED",
  ];
  const purposes = [
    "Home Renovation",
    "Business Expansion",
    "Education Fees",
    "Vehicle Purchase",
    "Medical Emergency",
    "Wedding Expenses",
    "Debt Consolidation",
    "Travel",
  ];

  for (let i = 0; i < 20; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const type = loanTypes[Math.floor(Math.random() * loanTypes.length)];
    const status =
      loanStatuses[Math.floor(Math.random() * loanStatuses.length)];
    const amount = Math.floor(Math.random() * 900000) + 50000; // 50k to 10L
    const purpose = purposes[Math.floor(Math.random() * purposes.length)];

    await prisma.loan.create({
      data: {
        userId: user.id,
        type,
        amount: amount.toString(),
        interestRate: (Math.random() * 5 + 8).toFixed(2), // 8-13%
        duration: Math.floor(Math.random() * 60) + 12, // 12-72 months
        status,
        purpose,
        monthlyIncome: (Math.floor(Math.random() * 200000) + 30000).toString(),
        employmentType: Math.random() > 0.5 ? "SALARIED" : "SELF_EMPLOYED",
        documents: {},
        remarks: status === "REJECTED" ? "Insufficient credit score" : null,
        approvedAt: status === "APPROVED" ? new Date() : null,
        rejectedAt: status === "REJECTED" ? new Date() : null,
        createdAt: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ),
      },
    });
  }

  console.log("✅ Database seeded successfully!");
  console.log(`👤 Created ${users.length} users`);
  console.log(`📊 Created 25 CIBIL records`);
  console.log(`💰 Created 20 loan applications`);
  console.log(`🔑 Admin credentials: admin@borrowww.com / admin123`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
