"use client"

import { useState, useRef } from "react"
import { FaCalendarAlt, FaChartLine, FaCheckCircle, FaLock, FaShieldAlt, FaUser } from "react-icons/fa"

import { motion } from "framer-motion"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const indianStates = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
]

const identityTypes = ["Aadhaar", "PAN", "Voter Card", "Passport"]
const genderOptions = ["Male", "Female", "Transgender"]

export default function CIBILCheck() {
  const [FormData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    mobileNumber: "",
    address: "",
    state: "",
    pincode: "",
    identity: "",
    identityNumber: "",
    consent: false,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cibilScore, setCibilScore] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const resultsRef = useRef(null)

  const generateFakeCibilScore = () => {
    return Math.floor(Math.random() * (850 - 300 + 1)) + 300
  }

  const validateBureauForm = () => {
    const newErrors = {}

    if (!FormData.firstName.trim()) newErrors.firstName = "First Name is required"
    if (!FormData.lastName.trim()) newErrors.lastName = "Last Name is required"
    if (!FormData.dob) newErrors.dob = "Date of Birth is required"
    if (!FormData.gender) newErrors.gender = "Gender is required"
    if (!FormData.mobileNumber.trim()) newErrors.mobileNumber = "Mobile Number is required"
    if (!FormData.address.trim()) newErrors.address = "Address is required"
    if (!FormData.state) newErrors.state = "State is required"
    if (!FormData.pincode.trim()) newErrors.pincode = "Pincode is required"
    if (!FormData.identity) newErrors.identity = "Identity is required"
    if (FormData.identity && !FormData.identityNumber.trim()) newErrors.identityNumber = "Identity Number is required"
    if (!FormData.consent) newErrors.consent = "You must agree to the terms"

    if (FormData.mobileNumber && !/^\d{10}$/.test(FormData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile Number must be 10 digits"
    }

    if (FormData.pincode && !/^\d{6}$/.test(FormData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits"
    }

    if (FormData.identity && FormData.identityNumber) {
      if (FormData.identity === "Aadhaar" && !/^\d{12}$/.test(FormData.identityNumber)) {
        newErrors.identityNumber = "Aadhaar number must be 12 digits"
      } else if (FormData.identity === "PAN" && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(FormData.identityNumber)) {
        newErrors.identityNumber = "PAN must be in format: ABCDE1234F"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === "identity") {
      setFormData((prev) => ({ ...prev, identityNumber: "" }))
    }
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleBureauSubmit = async (e) => {
    e.preventDefault()
    if (!validateBureauForm()) return

    setIsSubmitting(true)

    setTimeout(() => {
      console.log("[v0] Form submitted successfully!")
      console.log("[v0] Submitted form data:", FormData)
      console.table(FormData)

      const generatedScore = generateFakeCibilScore()
      console.log("[v0] Generated CIBIL Score:", generatedScore)

      setCibilScore(generatedScore)
      setSubmittedData(FormData)
      setShowResults(true)
      setIsSubmitting(false)

      // Scroll to results section
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }, 2000)
  }

  const getScoreCategory = (score) => {
    if (score >= 750) return { category: "Excellent", color: "text-green-600", bg: "bg-green-100" }
    if (score >= 650) return { category: "Good", color: "text-[#2D3E50]", bg: "bg-blue-100" }
    if (score >= 550) return { category: "Fair", color: "text-yellow-600", bg: "bg-yellow-100" }
    return { category: "Poor", color: "text-red-600", bg: "bg-red-100" }
  }

  const getScoreDescription = (score) => {
    if (score >= 750)
      return "Excellent credit score! You are likely to get the best loan terms and lowest interest rates."
    if (score >= 650) return "Good credit score. You should be able to get loans with competitive rates."
    if (score >= 550) return "Fair credit score. You may get loans but with higher interest rates."
    return "Poor credit score. You may face difficulties in getting loans. Consider improving your credit score."
  }

  const factors = [
    {
      factor: "Payment History",
      impact: "35%",
      description: "Timely payment of EMIs and credit card bills",
      icon: FaCheckCircle,
    },
    {
      factor: "Credit Utilization",
      impact: "30%",
      description: "How much of your available credit you use",
      icon: FaChartLine,
    },
    {
      factor: "Credit History Length",
      impact: "15%",
      description: "How long you have been using credit",
      icon: FaCalendarAlt,
    },
    {
      factor: "Credit Mix",
      impact: "10%",
      description: "Types of credit accounts you have",
      icon: FaShieldAlt,
    },
    {
      factor: "New Credit",
      impact: "10%",
      description: "Recent credit inquiries and new accounts",
      icon: FaUser,
    },
  ]

  const tips = [
    "Pay all your bills on time, every time",
    "Keep your credit utilization below 30%",
    "Don't close old credit accounts",
    "Limit new credit applications",
    "Monitor your credit report regularly",
    "Dispute any errors in your credit report",
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[var(--primary-blue-light)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] rounded-full text-sm font-medium mb-6">
              <FaShieldAlt className="mr-2" />
              Free CIBIL Check
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 mb-6 tracking-tighter">
              Check Your <span className="text-[var(--primary-blue)] italic tiemposfine">CIBIL Score</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get your free CIBIL score instantly. No hidden charges, no credit card required. Check your credit health
              and improve your loan eligibility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid  gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center shadow-lg">
                  <FaLock className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Secure CIBIL Check</h2>
                  <p className="text-gray-600 text-sm">Your data is protected with bank-level security</p>
                </div>
              </div>

              <form onSubmit={handleBureauSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Enter First Name"
                      value={FormData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="middleName" className="text-sm font-medium">
                      Middle Name
                    </Label>
                    <Input
                      id="middleName"
                      placeholder="Enter Middle Name"
                      value={FormData.middleName}
                      onChange={(e) => handleInputChange("middleName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Enter Last Name"
                      value={FormData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                  </div>
                </div>

                {/* DOB, Gender, Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dob" className="text-sm font-medium">
                      D.O.B (Date of Birth) <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="dob"
                        type="date"
                        value={FormData.dob}
                        onChange={(e) => handleInputChange("dob", e.target.value)}
                        className={errors.dob ? "border-red-500" : ""}
                      />
                      <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.dob && <p className="text-red-500 text-xs">{errors.dob}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Gender <span className="text-red-500">*</span>
                    </Label>
                    <Select value={FormData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                        <SelectValue placeholder="-- Please Select --" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-black">
                        {genderOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber" className="text-sm font-medium">
                      Mobile Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="mobileNumber"
                      placeholder="Enter Mobile Number"
                      value={FormData.mobileNumber}
                      onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                      className={errors.mobileNumber ? "border-red-500" : ""}
                      maxLength={10}
                    />
                    {errors.mobileNumber && <p className="text-red-500 text-xs">{errors.mobileNumber}</p>}
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    placeholder="Enter Address"
                    value={FormData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
                </div>

                {/* State, Pincode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      State <span className="text-red-500">*</span>
                    </Label>
                    <Select value={FormData.state} onValueChange={(value) => handleInputChange("state", value)}>
                      <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                        <SelectValue placeholder="-- Please Select --" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 bg-white text-black">
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-sm font-medium">
                      Pincode <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="pincode"
                      placeholder="Enter Pincode"
                      value={FormData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      className={errors.pincode ? "border-red-500" : ""}
                      maxLength={6}
                    />
                    {errors.pincode && <p className="text-red-500 text-xs">{errors.pincode}</p>}
                  </div>
                </div>

                {/* Identity, Identity Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Identity <span className="text-red-500">*</span>
                    </Label>
                    <Select value={FormData.identity} onValueChange={(value) => handleInputChange("identity", value)}>
                      <SelectTrigger className={errors.identity ? "border-red-500" : ""}>
                        <SelectValue placeholder="-- Please Select --" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-black">
                        {identityTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.identity && <p className="text-red-500 text-xs">{errors.identity}</p>}
                  </div>

                  {FormData.identity && (
                    <div className="space-y-2">
                      <Label htmlFor="identityNumber" className="text-sm font-medium">
                        {FormData.identity} Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="identityNumber"
                        placeholder={
                          FormData.identity === "Aadhaar"
                            ? "Enter 12-digit Aadhaar Number"
                            : FormData.identity === "PAN"
                              ? "Enter PAN (e.g., ABCDE1234F)"
                              : FormData.identity === "Voter Card"
                                ? "Enter Voter ID Number"
                                : FormData.identity === "Passport"
                                  ? "Enter Passport Number"
                                  : "Enter Identity Number"
                        }
                        value={FormData.identityNumber}
                        onChange={(e) => handleInputChange("identityNumber", e.target.value.toUpperCase())}
                        className={errors.identityNumber ? "border-red-500" : ""}
                        maxLength={FormData.identity === "Aadhaar" ? 12 : FormData.identity === "PAN" ? 10 : undefined}
                      />
                      {errors.identityNumber && <p className="text-red-500 text-xs">{errors.identityNumber}</p>}
                    </div>
                  )}
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start space-x-3 pt-4">
                  <Checkbox
                    id="consent"
                    checked={FormData.consent}
                    onCheckedChange={(checked) => handleInputChange("consent", checked)}
                    className={errors.consent ? "border-red-500" : ""}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                      I agree, all information mentioned above is true and I authorize Scoreme Solutions Private Limited
                      to fetch my bureau data.
                    </Label>
                    {errors.consent && <p className="text-red-500 text-xs">{errors.consent}</p>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-12 py-3 bg-[var(--primary-blue)]  hover:bg-[var(--primary-blue)]  text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>

            {showResults && (
              <motion.div
                ref={resultsRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* CIBIL Score Display */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-8 text-white shadow-2xl"
                >
                  <h3 className="text-2xl font-bold mb-6">Your CIBIL Score</h3>
                  <div className="text-6xl font-bold mb-4">{cibilScore}</div>
                  <div
                    className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${getScoreCategory(cibilScore).bg} ${getScoreCategory(cibilScore).color}`}
                  >
                    {getScoreCategory(cibilScore).category}
                  </div>
                  <p className="text-white/90">{getScoreDescription(cibilScore)}</p>
                </motion.div>

                {/* Submitted Data Table */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
                >
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Submitted Information</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Field</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-600">First Name</td>
                          <td className="py-3 px-4 text-gray-900">{submittedData?.firstName}</td>
                        </tr>
                        {submittedData?.middleName && (
                          <tr className="border-b border-gray-100">
                            <td className="py-3 px-4 text-gray-600">Middle Name</td>
                            <td className="py-3 px-4 text-gray-900">{submittedData?.middleName}</td>
                          </tr>
                        )}
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-600">Last Name</td>
                          <td className="py-3 px-4 text-gray-900">{submittedData?.lastName}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-600">Date of Birth</td>
                          <td className="py-3 px-4 text-gray-900">{submittedData?.dob}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-600">Gender</td>
                          <td className="py-3 px-4 text-gray-900">{submittedData?.gender}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-600">Mobile Number</td>
                          <td className="py-3 px-4 text-gray-900">{submittedData?.mobileNumber}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-600">Address</td>
                          <td className="py-3 px-4 text-gray-900">{submittedData?.address}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-600">State</td>
                          <td className="py-3 px-4 text-gray-900">{submittedData?.state}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-600">Pincode</td>
                          <td className="py-3 px-4 text-gray-900">{submittedData?.pincode}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-600">Identity Type</td>
                          <td className="py-3 px-4 text-gray-900">{submittedData?.identity}</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-600">{submittedData?.identity} Number</td>
                          <td className="py-3 px-4 text-gray-900">{submittedData?.identityNumber}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Info Section - only show if no results yet */}
            {!showResults && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {/* CIBIL Score Display */}
                {/* Features */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Check CIBIL Score?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Free & Instant</h4>
                        <p className="text-gray-600 text-sm">Get your score instantly without any charges</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Secure & Private</h4>
                        <p className="text-gray-600 text-sm">Bank-level encryption protects your data</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Improve Score</h4>
                        <p className="text-gray-600 text-sm">Get tips to improve your credit score</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Score Factors */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Affects Your CIBIL Score?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the factors that influence your credit score helps you make better financial decisions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {factors.map((factor, index) => (
              <motion.div
                key={factor.factor}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-[var(--primary-blue)]"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-2xl flex items-center justify-center shadow-lg">
                      <factor.icon className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{factor.factor}</h3>
                      <span className="text-[var(--primary-blue)] font-bold text-lg">{factor.impact}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{factor.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Tips to Improve Your CIBIL Score</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to boost your credit score and improve your loan eligibility
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tips.map((tip, index) => (
              <motion.div
                key={tip}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-[var(--primary-blue)]/5 to-white p-8 rounded-3xl border border-[var(--primary-blue)]/10 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed font-medium">{tip}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-3xl p-8 text-white text-center shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Improve Your Credit Score?</h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Get personalized advice and loan offers based on your credit score. Our experts will help you find the
              best deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[var(--primary-blue)] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
              >
                Get Free Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[var(--primary-blue)] transition-all duration-200"
              >
                View Loan Offers
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
