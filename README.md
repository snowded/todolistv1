# Advanced Todo App

A beautiful and powerful todo application built with modern web technologies. Features a sleek dark theme inspired by Supabase's design system, with gradient accents and a professional user interface.

![Advanced Todo App](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=2072)

## Features

- 🎨 Modern, dark-themed UI with gradient accents
- 📱 Fully responsive design
- 💾 Local storage persistence
- ✨ Rich todo features:
  - Priority levels (Low, Medium, High)
  - Due dates with calendar picker
  - Task categories
  - Task descriptions
  - Task status tracking
- 🚀 Smooth animations and transitions
- 🎯 Clean and intuitive user experience

## Tech Stack

- **Framework**: [Astro](https://astro.build) with React
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Date Handling**: [date-fns](https://date-fns.org)
- **Type Safety**: TypeScript

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/
│   ├── todos/
│   │   └── TodoList.tsx    # Main todo list component
│   └── ui/                 # shadcn/ui components
├── layouts/
│   └── Layout.astro        # Main layout component
├── lib/
│   └── utils.ts            # Utility functions
├── pages/
│   └── index.astro         # Home page
└── styles/
    └── globals.css         # Global styles
```

## Features in Detail

### Todo Management
- Create new todos with titles and optional descriptions
- Set priority levels with visual indicators
- Add due dates using a calendar picker
- Mark todos as completed/uncompleted
- Automatic persistence to local storage

### User Interface
- Clean and modern dark theme
- Responsive design that works on all devices
- Smooth transitions and hover effects
- Gradient accents for visual appeal
- Intuitive task management

### Data Persistence
- Automatic saving to browser's local storage
- Data persists across page refreshes
- No account required

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
