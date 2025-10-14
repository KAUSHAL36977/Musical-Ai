# Musical AI - AI Music Generation Platform

A complete music generation web application built with Next.js 14, featuring a step-by-step wizard interface for creating custom AI-generated music with playback, modification, and download capabilities.

## Features

- 🎵 **Step-by-Step Music Wizard**: Guided interface for music creation
- 🎨 **Multiple Genres**: Rap, Rock, Pop, Electronic, Classical, Jazz, and more
- 🌍 **Multi-Language Support**: English, Hindi, Hinglish, Haryanvi, Punjabi, Spanish, French, German
- 🎭 **Vibe Selection**: Choose from energetic, chill, romantic, melancholic, and more
- ⏱️ **Custom Duration**: From 10 seconds to 5 minutes
- 🎤 **Lyrics Input**: Describe your music theme and requirements
- 🔊 **Audio Player**: Professional player with waveform visualization
- 📱 **Responsive Design**: Works on desktop and mobile
- 🔐 **Authentication**: Secure user accounts with NextAuth.js
- 💾 **Track Management**: Save, organize, and download your creations

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui, Radix UI
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with JWT
- **State Management**: Zustand
- **Audio Processing**: Web Audio API
- **Styling**: Tailwind CSS with custom components

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd musical-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/musical_ai"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"

   # AI Services (Optional - for production)
   OPENAI_API_KEY="your-openai-api-key"
   REPLICATE_API_TOKEN="your-replicate-api-token"

   # Storage (Optional - for production)
   AWS_ACCESS_KEY_ID="your-aws-access-key"
   AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
   AWS_REGION="us-east-1"
   AWS_S3_BUCKET="your-s3-bucket"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
musical-ai/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   └── music/         # Music generation endpoints
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── my-creations/      # User dashboard
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── wizard/           # Music wizard components
│   │   ├── audio/            # Audio player components
│   │   └── ui/               # Shadcn/ui components
│   ├── lib/                  # Utility libraries
│   │   ├── ai/               # AI music generation
│   │   ├── storage/          # File storage utilities
│   │   └── auth.ts           # NextAuth configuration
│   └── types/                # TypeScript type definitions
├── prisma/
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

## Usage

### Creating Music

1. **Start the Wizard**: Click "Create New Track" on the homepage
2. **Choose Genre**: Select from available genres and sub-genres
3. **Select Language**: Choose your preferred language (install packs if needed)
4. **Pick Vibe**: Select the emotional tone for your music
5. **Set Duration**: Choose how long you want your track to be
6. **Add Details**: Describe your music theme and any specific requirements
7. **Generate**: Review your choices and generate your music

### Managing Tracks

- **View All Tracks**: Visit "My Creations" to see all your generated tracks
- **Play Music**: Click "Play" to listen to your tracks with the audio player
- **Download**: Download tracks as MP3 files
- **Search**: Use the search bar to find specific tracks

## API Endpoints

- `POST /api/music/generate` - Generate new music track
- `GET /api/music/download/[trackId]` - Download track file
- `POST /api/music/languages/install` - Install language pack
- `POST /api/auth/[...nextauth]` - Authentication endpoints

## Database Schema

The application uses PostgreSQL with the following main entities:

- **User**: User accounts with credits system
- **Track**: Generated music tracks with metadata
- **LanguagePack**: Available language packs for music generation
- **Credit**: Credit transaction history

## Customization

### Adding New Genres

Edit `src/components/wizard/GenreSelector.tsx` to add new genres and sub-genres.

### Adding New Languages

Update the `LANGUAGES` array in `src/components/wizard/LanguageSelector.tsx`.

### Customizing AI Generation

Modify `src/lib/ai/musicGenerator.ts` to integrate with different AI services.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

1. Build the application: `npm run build`
2. Set up PostgreSQL database
3. Configure environment variables
4. Deploy the built application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue on GitHub.

---

**Note**: This is a demo application. For production use, integrate with actual AI music generation services and implement proper user authentication and file storage.