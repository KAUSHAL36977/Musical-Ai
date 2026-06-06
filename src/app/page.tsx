import { Suspense } from 'react'
import { motion } from 'framer-motion'
import MusicWizard from '@/components/wizard/MusicWizard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Music, Sparkles, Zap } from 'lucide-react'
import { AmbientParticles, AmbientGradient, AnimatedContainer, AnimatedItem, PageTransition } from '@/components/motion/AnimatedComponents'

export default function Home() {
  return (
    <PageTransition>
      <AmbientGradient />
      <AmbientParticles count={25} />
      <div className="min-h-screen relative">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b glass-strong"
        >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Music className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Musical AI
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered Music Generation</span>
              </div>
            </div>
          </div>
        </div>
        </motion.header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Create Your Perfect Music
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use our step-by-step wizard to generate custom AI music tailored to your preferences. 
              Choose genre, language, vibe, and more!
            </p>
          </motion.div>

        <Suspense fallback={
          <Card className="max-w-4xl mx-auto glass">
            <CardContent className="p-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2">Loading wizard...</span>
              </div>
            </CardContent>
          </Card>
        }>
          <MusicWizard />
        </Suspense>

        {/* Features */}
        <AnimatedContainer className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedItem>
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <Card className="glass h-full">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <Music className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Multiple Genres</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Choose from Rap, Rock, Pop, Electronic, Classical, Jazz, and more with sub-genre options.
              </p>
            </CardContent>
            </Card>
            </motion.div>
          </AnimatedItem>

          <AnimatedItem>
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <Card className="glass h-full">

          <AnimatedItem>
            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <Card className="glass h-full">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">AI-Powered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Advanced AI technology creates unique compositions based on your preferences and mood.
              </p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Instant Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Generate professional-quality music in seconds with our optimized AI models.
              </p>
            </CardContent>
            </Card>
            </motion.div>
          </AnimatedItem>
        </AnimatedContainer>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="border-t glass mt-16 relative z-10"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Musical AI. Powered by advanced AI technology.</p>
          </div>
        </div>
      </motion.footer>
      </div>
    </PageTransition>
  )
}