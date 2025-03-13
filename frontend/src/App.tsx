"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
// Import the Coins icon
import { AlertCircle, CheckCircle2, Coins, Moon, Sun, Trophy } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Question {
  message: string
}

interface Answer {
  message: string
}

export default function Home() {
  const [question, setQuestion] = useState<Question | null>(null)
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentScore, setCurrentScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  // Add a new state variable to track when buttons should be disabled
  const [buttonsDisabled, setButtonsDisabled] = useState(false)

  // Update the fetchQuestion function to enable buttons when a new question loads
  const fetchQuestion = async () => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:8080/game/question")
      if (response.ok) {
        const data = await response.json()
        setQuestion(data)
      } else {
        console.error("Failed to fetch question")
      }
    } catch (error) {
      console.error("Error fetching question:", error)
    } finally {
      setLoading(false)
      setButtonsDisabled(false) // Enable buttons when new question is loaded
    }
  }

  // Update the handleAnswer function to disable buttons immediately after answering
  const handleAnswer = async (answer: number) => {
    // Disable buttons immediately to prevent multiple clicks
    setButtonsDisabled(true)

    try {
      const response = await fetch(`http://localhost:8080/game/answer?userAnswer=${answer}`, {
        method: "POST",
      })

      const data: Answer = await response.json()

      if (response.ok) {
        // Correct answer - increment score
        const newScore = currentScore + 1
        setCurrentScore(newScore)

        // Update high score if current score is higher
        if (newScore > highScore) {
          setHighScore(newScore)
        }

        setResult({ success: true, message: data.message })
      } else {
        // Incorrect answer - reset current score
        setCurrentScore(0)
        setResult({ success: false, message: data.message })
      }

      // Reload question after a short delay
      setTimeout(() => {
        setResult(null)
        fetchQuestion()
      }, 2000)
    } catch (error) {
      console.error("Error submitting answer:", error)
      setButtonsDisabled(false) // Re-enable buttons if there's an error
    }
  }

  useEffect(() => {
    fetchQuestion()
    // Apply dark mode by default
    document.documentElement.classList.add("dark")

    // Load scores from localStorage
    const savedScore = localStorage.getItem("currentScore")
    const savedHighScore = localStorage.getItem("highScore")

    if (savedScore) {
      setCurrentScore(Number.parseInt(savedScore, 10))
    }

    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore, 10))
    }
  }, [])

  // Save scores to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("currentScore", currentScore.toString())
    localStorage.setItem("highScore", highScore.toString())
  }, [currentScore, highScore])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">Jogo do Alfabeto</h1>

      {/* Score Display */}
      <div className="flex gap-6 mb-6">
        <Card className="w-48 h-24 px-4 py-3 flex flex-col items-center justify-center gap-1 bg-white dark:bg-gray-800 dark:text-white">
          <Coins className="h-5 w-5 text-blue-500 mb-1" />
          <div className="flex items-center gap-2">
            <span className="font-semibold">Pontuação:</span>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{currentScore}</span>
          </div>
        </Card>

        <Card className="w-48 h-24 px-4 py-3 flex flex-col items-center justify-center gap-1 bg-white dark:bg-gray-800 dark:text-white">
          <Trophy className="h-5 w-5 text-yellow-500 mb-1" />
          <div className="flex items-center gap-2">
            <span className="font-semibold">Recorde:</span>
            <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{highScore}</span>
          </div>
        </Card>
      </div>

      {/* Update the alert to be centered with fixed width */}
      {result && (
        <div className="flex justify-center w-full mb-6">
          <Alert
            className={`w-full max-w-md ${
              result.success
                ? "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800"
                : "bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800"
            }`}
          >
            {result.success ? (
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            )}
            <AlertTitle
              className={result.success ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"}
            >
              {result.success ? "Correto!" : "Incorreto!"}
            </AlertTitle>
            <AlertDescription
              className={result.success ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}
            >
              {result.message}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <Card className="w-full max-w-md p-8 shadow-xl border-0 bg-white dark:bg-gray-800 dark:text-white rounded-2xl">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="text-2xl font-medium text-center mb-10">{question?.message}</div>

            <div className="flex justify-center gap-6">
              <Button
                size="lg"
                onClick={() => handleAnswer(1)}
                disabled={buttonsDisabled}
                className={`w-36 h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/30 ${
                  buttonsDisabled ? "opacity-50 cursor-not-allowed transform-none hover:scale-100" : ""
                }`}
              >
                Antes
              </Button>

              <Button
                size="lg"
                onClick={() => handleAnswer(2)}
                disabled={buttonsDisabled}
                className={`w-36 h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-pink-500/30 ${
                  buttonsDisabled ? "opacity-50 cursor-not-allowed transform-none hover:scale-100" : ""
                }`}
              >
                Depois
              </Button>
            </div>
          </>
        )}
      </Card>
    </main>
  )
}

