# Cloud-Based Feature Roadmap Management Tool

A modern, cloud-based feature roadmap management tool built with Next.js 16, featuring RICE scoring methodology, OKR alignment, and sprint planning capabilities. This application helps product teams prioritize features, track progress, and align development efforts with strategic objectives.

## 🚀 Features

### Core Functionality
- **Feature Management**: Create, edit, and track product features with comprehensive metadata
- **RICE Scoring**: Automatic prioritization using the RICE framework (Reach × Impact × Confidence / Effort)
- **OKR Alignment**: Link features to Objectives and Key Results for strategic alignment
- **Sprint Planning**: Organize features into sprints with capacity and velocity tracking
- **Status Tracking**: Monitor feature progress through customizable status workflows

### Analytics & Visualization
- **Dashboard Overview**: Real-time metrics and KPIs for product roadmap health
- **RICE Analysis Charts**: Visual breakdown of prioritization scores
- **Priority Matrix**: 2D visualization of feature priorities
- **Status Distribution**: Track feature distribution across different statuses
- **Velocity Charts**: Monitor team performance and sprint velocity trends
- **OKR Progress Tracking**: Visual representation of objective completion

### User Experience
- **Modern UI**: Built with Radix UI components and Tailwind CSS
- **Dark Mode Support**: Theme switching with next-themes
- **Responsive Design**: Mobile-first approach for accessibility on all devices
- **Real-time Updates**: State management with Zustand for instant feedback

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16.0.0](https://nextjs.org/) with App Router
- **Language**: TypeScript 5
- **UI Library**: React 19.2.0
- **Styling**: Tailwind CSS 4.1.9 with custom animations
- **Component Library**: Radix UI for accessible components
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization

### State Management & Data
- **State**: Zustand for global state management
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns for date manipulation
- **Immutability**: Immer for state updates

### Additional Libraries
- **UI Components**: 
  - Dialog, Dropdown, Toast notifications (Radix UI)
  - Command palette (cmdk)
  - Carousel (Embla)
  - Resizable panels
- **Analytics**: Vercel Analytics integration
- **Theme**: next-themes for dark mode

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- pnpm (recommended) or npm/yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/Cloud-Based-Feature-Roadmap-Management-Tool.git
   cd Cloud-Based-Feature-Roadmap-Management-Tool
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
.
├── app/                      # Next.js App Router pages
│   ├── api/                 # API routes
│   │   ├── features/        # Feature CRUD endpoints
│   │   ├── okrs/           # OKR management endpoints
│   │   ├── sprints/        # Sprint management endpoints
│   │   └── seed/           # Database seeding endpoint
│   ├── dashboard/          # Analytics dashboard page
│   ├── okrs/              # OKR management page
│   ├── sprints/           # Sprint planning page
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home page (Feature Roadmap)
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── ui/                # Reusable UI components (Radix)
│   ├── feature-dialog.tsx  # Feature creation/editing dialog
│   ├── feature-table.tsx   # Main feature list/table
│   ├── navigation.tsx      # App navigation bar
│   ├── okr-*.tsx          # OKR-related components
│   ├── sprint-*.tsx       # Sprint-related components
│   ├── rice-*.tsx         # RICE scoring visualizations
│   └── stats-cards.tsx    # Dashboard statistics cards
├── lib/                    # Utility libraries
│   ├── db.ts              # Database utilities
│   ├── db-types.ts        # Database type definitions
│   ├── types.ts           # TypeScript type definitions
│   ├── store.ts           # Zustand state management
│   ├── mock-data.ts       # Mock data for development
│   └── utils.ts           # Helper functions
├── scripts/               # Database scripts
│   ├── 01-create-tables.sql  # Database schema
│   └── 02-seed-data.sql      # Sample data
├── hooks/                 # Custom React hooks
├── public/               # Static assets
├── styles/              # Additional stylesheets
├── package.json         # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── next.config.mjs     # Next.js configuration
```

## 🎯 Key Concepts

### RICE Scoring

RICE is a prioritization framework that helps determine which features to work on:
- **Reach**: Number of users/customers affected (per quarter)
- **Impact**: How much it will improve the user experience (0.25 = minimal, 0.5 = low, 1 = medium, 2 = high, 3 = massive)
- **Confidence**: How confident you are in your estimates (percentage, 0-100)
- **Effort**: Total time required to implement (person-months)

**Formula**: RICE Score = (Reach × Impact × Confidence) / Effort

### OKRs (Objectives and Key Results)

The tool supports linking features to OKRs to ensure strategic alignment:
- **Objectives**: High-level goals you want to achieve
- **Key Results**: Measurable outcomes that indicate progress toward objectives
- Features can be linked to multiple OKRs to track alignment

### Sprint Planning

Organize features into time-boxed sprints:
- Define sprint capacity and velocity
- Assign features to sprints
- Track sprint status (planning, active, completed)
- Monitor team velocity over time

## 🔌 API Routes

The application includes RESTful API endpoints:

### Features
- `GET /api/features` - List all features
- `POST /api/features` - Create a new feature
- `GET /api/features/[id]` - Get a specific feature
- `PUT /api/features/[id]` - Update a feature
- `DELETE /api/features/[id]` - Delete a feature

### OKRs
- `GET /api/okrs` - List all OKRs
- `POST /api/okrs` - Create a new OKR
- `PUT /api/okrs/[id]` - Update an OKR

### Sprints
- `GET /api/sprints` - List all sprints
- `POST /api/sprints` - Create a new sprint
- `PUT /api/sprints/[id]` - Update a sprint

### Utilities
- `POST /api/seed` - Seed database with sample data

## 💾 Database Schema

The application uses a PostgreSQL-compatible schema with the following main tables:

### Features Table
- Tracks all product features
- Stores RICE scoring components
- Includes status, priority, tags, and metadata
- Auto-calculates RICE score using computed column

### OKRs Table
- Stores objectives and key results
- Hierarchical structure (objectives contain key results)
- Tracks progress and target values
- Quarterly alignment

### Sprints Table
- Sprint planning information
- Capacity and velocity tracking
- Date ranges and status

See `scripts/01-create-tables.sql` for the complete schema.

## 🚦 Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

### Environment Variables

The application is currently configured to work with mock data out of the box. For production use with a real database, you would need to configure:

```env
DATABASE_URL=your_postgresql_connection_string
```

### Code Style

- TypeScript with strict mode enabled
- ESLint for code quality
- Component-based architecture
- Custom hooks for reusable logic

## 📦 Building for Production

1. **Build the application**
   ```bash
   pnpm build
   ```

2. **Start the production server**
   ```bash
   pnpm start
   ```

The application will be optimized and ready for deployment.

## 🌐 Deployment

This Next.js application can be deployed to various platforms:

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will auto-detect Next.js and deploy

### Other Platforms
- **Netlify**: Supports Next.js with SSR
- **AWS**: Using AWS Amplify or EC2
- **Docker**: Create a Docker container for any cloud provider

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [v0.app](https://v0.dev) - AI-powered UI development
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

## 🗺️ Roadmap

Future enhancements planned:
- User authentication and authorization
- Real-time collaboration features
- Advanced filtering and search
- Export to various formats (PDF, CSV, etc.)
- Integration with project management tools (Jira, Linear, etc.)
- API documentation with Swagger/OpenAPI
- Enhanced analytics and reporting
- Custom fields and workflows
- Notifications and reminders
- Mobile app development

---

**Made with ❤️ using Next.js and TypeScript**
