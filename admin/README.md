# Borrowww Admin Dashboard

A modern, responsive admin dashboard for managing loan and credit systems with real-time data visualization and comprehensive user management.

## 🚀 Features

### 📊 Dashboard Overview

- **Real-time Statistics**: Live updates of user activity, loan applications, and CIBIL reports
- **Interactive Charts**: Beautiful visualizations using Recharts
  - Activity trends over time
  - Loan status distribution (pie charts)
  - CIBIL score distribution
  - Amount distribution analysis
- **Quick Actions**: One-click access to common admin tasks

### 👥 User Management

- **Comprehensive User Profiles**: View detailed user information including CIBIL check history
- **Advanced Filtering**: Filter by role, verification status, and search by name/email
- **Bulk Operations**: Verify/unverify users, delete accounts
- **Activity Tracking**: Monitor user login patterns and engagement

### 💳 CIBIL Data Management

- **Score Analysis**: Visual breakdown of CIBIL scores across different ranges
- **Status Tracking**: Monitor submitted vs unsubmitted reports
- **Advanced Search**: Filter by score ranges, status, and user details
- **Real-time Updates**: Live status updates for processing reports

### 💰 Loan Management

- **Application Tracking**: Monitor loan applications from submission to approval
- **Status Management**: Approve, reject, or update loan statuses
- **Amount Analysis**: Visual breakdown of loan amounts and purposes
- **Quick Actions**: Streamlined approval process for pending applications

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript
- **UI Framework**: shadcn/ui components
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Build Tool**: Vite
- **Routing**: React Router DOM

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd borrowww/admin
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the admin directory:

   ```env
   VITE_API_URL=https://borrowww.com/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

- `VITE_API_URL`: Backend API endpoint (default: https://borrowww.com/api)

### API Integration

The dashboard integrates with the following API endpoints:

#### Authentication

- `POST /admin/auth/login` - Admin login
- `GET /admin/auth/profile` - Get admin profile
- `POST /admin/auth/logout` - Admin logout

#### User Management

- `GET /users` - Get all users with pagination
- `GET /users/stats` - Get user statistics
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

#### CIBIL Management

- `GET /cibil/submitted` - Get submitted CIBIL reports
- `GET /cibil/unsubmitted` - Get unsubmitted CIBIL reports
- `GET /cibil/stats` - Get CIBIL statistics

#### Loan Management

- `GET /loans` - Get all loans
- `GET /loans/stats` - Get loan statistics
- `PUT /loans/:id/status` - Update loan status

## 🎨 UI Components

### Built with shadcn/ui

- **Cards**: Clean, modern card layouts for data display
- **Buttons**: Consistent button styling with variants
- **Badges**: Status indicators and labels
- **Responsive Design**: Mobile-first approach

### Chart Components

- **Line Charts**: Activity trends over time
- **Pie Charts**: Status and distribution analysis
- **Bar Charts**: Amount and count comparisons
- **Responsive**: All charts adapt to screen size

## 🔐 Security Features

- **Admin-only Access**: Protected routes requiring authentication
- **Token-based Auth**: JWT tokens for secure API communication
- **Role-based Permissions**: Different access levels for admin functions
- **Data Privacy**: Sensitive user information only visible to admins

## 📱 Responsive Design

The dashboard is fully responsive and works seamlessly on:

- Desktop computers
- Tablets
- Mobile devices

## 🚀 Performance Optimizations

- **Real-time Updates**: 30-second intervals for live data
- **Lazy Loading**: Components load as needed
- **Optimized Charts**: Efficient rendering with Recharts
- **Caching**: API responses cached for better performance

## 📊 Data Visualization

### Dashboard Charts

1. **Activity Overview**: Line chart showing user activity trends
2. **Loan Status**: Pie chart of loan application statuses
3. **CIBIL Distribution**: Score range distribution
4. **Amount Analysis**: Loan amount ranges

### Interactive Features

- **Hover Tooltips**: Detailed information on chart elements
- **Click Actions**: Direct navigation from chart elements
- **Filter Integration**: Charts update based on applied filters

## 🔄 Real-time Features

- **Auto-refresh**: Dashboard data updates every 30 seconds
- **Live Counters**: Statistics update in real-time
- **Status Indicators**: Visual feedback for data freshness
- **Error Handling**: Graceful error display and recovery

## 🎯 User Experience

### Modern Design

- **Clean Interface**: Minimalist design focusing on data
- **Consistent Styling**: Unified design language throughout
- **Intuitive Navigation**: Easy-to-use navigation structure
- **Visual Hierarchy**: Clear information organization

### Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **Color Contrast**: High contrast ratios for readability
- **Focus Indicators**: Clear focus states for interactive elements

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Code Structure

```
src/
├── components/      # Reusable UI components
│   ├── ui/         # shadcn/ui components
│   └── ...         # Custom components
├── pages/          # Page components
├── services/       # API services
├── contexts/       # React contexts
├── lib/           # Utility functions
└── assets/        # Static assets
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for Borrowww**
