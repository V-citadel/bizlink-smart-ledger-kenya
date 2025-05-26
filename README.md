
# Biz Link - Smart Business Tracker

A modern business management web application designed specifically for Kenyan entrepreneurs and small businesses. Track income, expenses, manage invoices, and get insights into your business performance with multilingual support (English/Kiswahili).

![Biz Link Dashboard](public/placeholder.svg)

## 🌟 Features

### Core Functionality
- **📊 Financial Tracking**: Track income and expenses with detailed categorization
- **💰 Real-time Profit/Loss**: Automatically calculated profit margins and financial insights
- **📱 Multi-Input Methods**: Add transactions via voice, photo, or manual entry
- **🌍 Multilingual Support**: Full English and Kiswahili language support
- **📈 Business Reports**: Comprehensive reporting and analytics
- **🧾 Invoice Management**: Create and manage professional invoices

### Modern UX/UI
- **🎨 FreshBooks-Inspired Design**: Clean, professional interface
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **🚀 Fast Performance**: Built with React and Vite for optimal speed
- **♿ Accessibility**: Designed with accessibility best practices

### Security Features
- **🔐 Secure Authentication**: Email/password login system
- **🔒 Data Protection**: Secure data handling and storage
- **👤 User Management**: Individual user accounts and profiles

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Build Tool**: Vite
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-git-url>
   cd biz-link
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📖 Usage Guide

### Getting Started
1. **Register**: Create a new account using the registration page
2. **Login**: Sign in with your email and password
3. **Language**: Switch between English and Kiswahili using the language switcher
4. **Dashboard**: View your business overview on the main dashboard

### Adding Transactions

#### Method 1: Voice Input
- Click the "Voice" button
- Speak your transaction details
- The system will process and categorize your transaction

#### Method 2: Photo Capture
- Click the "Photo" button
- Take a picture of receipts or invoices
- The system will extract transaction details

#### Method 3: Manual Entry
- Click the "Manual" button
- Fill in the transaction form
- Select category and add description

### Managing Your Business

#### Dashboard Overview
- **Income**: View total money coming in
- **Expenses**: Track all business expenditures
- **Profit/Loss**: Real-time profit calculations
- **Recent Transactions**: Quick view of latest activities

#### Reports & Analytics
- Access detailed business reports
- View trends and patterns in your finances
- Export data for accounting purposes

#### Invoice Management
- Create professional invoices
- Track invoice status
- Manage customer information

## 🌍 Language Support

Biz Link supports two languages:

### English
Complete interface in English for international users and English-speaking Kenyans.

### Kiswahili (Swahili)
Full Kiswahili localization including:
- Navigation menus
- Transaction categories
- Business terms
- Help and guidance text

**Switching Languages**: Use the language switcher in the top header (EN/SW buttons).

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   ├── Dashboard.tsx   # Main dashboard component
│   ├── TransactionForm.tsx
│   ├── LanguageSwitcher.tsx
│   └── ...
├── contexts/           # React contexts
│   └── LanguageContext.tsx
├── pages/              # Page components
│   ├── Index.tsx       # Home/Dashboard page
│   ├── Login.tsx       # Authentication pages
│   ├── Register.tsx
│   └── NotFound.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── App.tsx             # Main application component
```

## 🎨 Design System

### Colors
- **Kenya Red**: Primary brand color
- **Kenya Green**: Success states and income
- **Kenya Blue**: Information and links
- **Kenya Black**: Text and borders

### Typography
- System fonts with fallbacks
- Responsive text sizing
- Clear hierarchy

### Components
Built with shadcn/ui for consistency:
- Buttons, Cards, Forms
- Modals, Toasts, Navigation
- Data tables and charts

## 📱 Responsive Design

Biz Link is fully responsive and works on:
- **Desktop**: Full feature set with optimal layout
- **Tablet**: Adapted interface for touch interaction
- **Mobile**: Streamlined mobile-first experience

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:
```env
# Add your environment variables here
VITE_API_URL=your_api_url
```

### Customization
- **Language**: Add new languages in `src/contexts/LanguageContext.tsx`
- **Themes**: Customize colors in `tailwind.config.ts`
- **Categories**: Modify business categories in transaction forms

## 🚀 Deployment

### Lovable Platform (Recommended)
1. Click the "Publish" button in the Lovable editor
2. Your app will be deployed automatically
3. Get a shareable URL instantly

### Custom Domain
1. Go to Project > Settings > Domains in Lovable
2. Connect your custom domain
3. Follow the DNS configuration instructions

### Other Platforms
The built application can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use existing component patterns
- Test on multiple screen sizes
- Ensure accessibility compliance
- Update documentation as needed

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
- Ensure all dependencies are installed: `npm install`
- Clear cache: `npm run dev -- --force`
- Check Node.js version compatibility

**Language Switching Not Working**
- Check localStorage for saved language preference
- Verify translation keys in LanguageContext

**Responsive Issues**
- Test with browser dev tools
- Check Tailwind CSS classes
- Verify viewport meta tag


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support and questions:
- Open an issue on GitHub
- Contact the development team
- Check the [FAQ section](docs/faq.md)

## 🎯 Roadmap

### Upcoming Features
- [ ] Multi-currency support
- [ ] Advanced reporting dashboard
- [ ] Mobile app version
- [ ] Integration with popular accounting software
- [ ] Team collaboration features
- [ ] Advanced security features (2FA, biometric login)

---

**Made with ❤️ for Kenyan entrepreneurs and small businesses**

*Empowering business growth through smart financial tracking and management.*
