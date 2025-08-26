"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Mail,
  MessageCircle,
  Clock,
  AlertTriangle,
  ArrowLeft,
  Check,
  Send,
  QrCode,
  Copy,
  PlayCircle,
  Calculator,
  CheckCircle,
  Package,
} from "lucide-react"

const whatsappChats = [
  {
    name: "Valéria Ramos",
    lastMessage: "Oi! Vi seu produto e me interessei...",
    time: "14:30",
    avatar: "/client1-profile.png",
    question: "Oi! Vi seu produto e me interessei, tem garantia?",
    responses: ["Claro! Damos 30 dias de garantia! 😊", "Fico feliz pelo interesse! Garantia de 30 dias."],
  },
  {
    name: "Ana Souza",
    lastMessage: "Preciso de informações...",
    time: "13:45",
    avatar: "/client2-profile.png",
    question: "Preciso de informações sobre o produto. É confiável mesmo?",
    responses: [
      "Oi Ana! Nosso sistema é 100% confiável.",
      "Olá! Sim, milhares de clientes satisfeitas.",
      "Oi! A segurança é nossa prioridade!",
    ],
  },
  {
    name: "Mariana Lima",
    lastMessage: "Quero comprar...",
    time: "12:20",
    avatar: "/client3-profile.png",
    question:
      "Quero comprar o produto que vi no site. Qual o prazo de entrega? Moro no Recreio dos Bandeirantes Rio de Janeiro..",
    responses: ["Oi Mari! Prazo de 7 a 15 dias úteis", "Olá! No seu caso, o prazo é de 15 dias úteis."],
  },
]

const orderData = {
  customerName: "Fernanda Costa",
  product: "Kit Beleza Premium",
  value: "R$ 89,90",
  question: "Oi! Fiz o pedido ontem mas ainda não recebi o código de rastreamento. Podem me ajudar?",
  responses: [
    "Oi Fernanda! Seu pedido ainda não foi aprovado.",
    "Olá! Seu pedido se encontra em análise!",
    "Oi! Pedido em análise, aguarde ser aprovado.",
  ],
}

export default function PlanoFunnel() {
  const [currentScreen, setCurrentScreen] = useState(1)
  const [earnings, setEarnings] = useState(0)
  const [progress, setProgress] = useState(0)
  const [countdown, setCountdown] = useState(600) // 10 minutes in seconds
  const [showEarnings, setShowEarnings] = useState(false)

  const [selectedEmail, setSelectedEmail] = useState<number | null>(null)
  const [respondedEmails, setRespondedEmails] = useState<number[]>([])
  const [selectedWhatsAppChat, setSelectedWhatsAppChat] = useState<number | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [respondedChats, setRespondedChats] = useState<number[]>([])
  const [userResponse, setUserResponse] = useState<string>("")
  const [showUserResponse, setShowUserResponse] = useState(false)
  const [orderResponded, setOrderResponded] = useState(false)

  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("")

  const [pixData, setPixData] = useState<any>(null)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
  })

  const copyPixCode = () => {
    // Implement copy functionality here
  }

  useEffect(() => {
    if (currentScreen === 8 && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [currentScreen, countdown])

  useEffect(() => {
    if (currentScreen === 6) {
      const loadingSteps = [
        { text: "Calculando seus ganhos...", progress: 20 },
        { text: "Verificando respostas enviadas...", progress: 40 },
        { text: "Contabilizando horas trabalhadas...", progress: 60 },
        { text: "Processando comissões...", progress: 80 },
        { text: "Finalizando relatório...", progress: 100 },
      ]

      let stepIndex = 0
      const interval = setInterval(() => {
        if (stepIndex < loadingSteps.length) {
          setLoadingText(loadingSteps[stepIndex].text)
          setLoadingProgress(loadingSteps[stepIndex].progress)
          stepIndex++
        } else {
          clearInterval(interval)
          setTimeout(() => setCurrentScreen(7), 500)
        }
      }, 1400) // 7 seconds total (5 steps × 1.4s each)

      return () => clearInterval(interval)
    }
  }, [currentScreen])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const addEarnings = (amount: number) => {
    setEarnings((prev) => prev + amount)
    setShowEarnings(true)
    console.log("[v0] 💰 Money sound effect played!")
    setTimeout(() => setShowEarnings(false), 3000)
  }

  const nextScreen = () => {
    setCurrentScreen((prev) => prev + 1)
  }

  const handleEmailResponse = (emailIndex: number, responseIndex: number) => {
    setRespondedEmails([...respondedEmails, emailIndex])
    addEarnings(12) // R$ 12,00 per email (R$ 36,00 total for 3 emails)
    setProgress(Math.min(25, (respondedEmails.length + 1) * 8.33)) // Progress based on emails completed
    setSelectedEmail(null)

    setTimeout(() => {
      if (respondedEmails.length + 1 >= 3 && currentScreen === 3) nextScreen()
    }, 7000)
  }

  const handleWhatsAppResponse = (chatIndex: number, responseIndex: number) => {
    const chat = whatsappChats[chatIndex]
    setUserResponse(chat.responses[responseIndex])
    setShowUserResponse(true)

    setTimeout(() => {
      setIsTyping(true)
    }, 500)

    setTimeout(() => {
      setIsTyping(false)
      setShowThankYou(true)

      setTimeout(() => {
        setRespondedChats([...respondedChats, chatIndex])
        setSelectedWhatsAppChat(null)
        setShowThankYou(false)
        setShowUserResponse(false)
        setUserResponse("")
        addEarnings(15) // R$ 15,00 per chat (R$ 45,00 total for 3 chats)
        setProgress(Math.min(50, 25 + (respondedChats.length + 1) * 8.33)) // Progress based on chats completed

        setTimeout(() => {
          if (respondedChats.length + 1 >= 3 && currentScreen === 4) nextScreen()
        }, 7000)
      }, 1000)
    }, 7000)
  }

  const handleOrderResponse = (responseIndex: number) => {
    setOrderResponded(true)
    addEarnings(54) // Adjusted to R$ 54,00 to maintain total of R$ 135,00
    setProgress(75)

    setTimeout(() => {
      if (currentScreen === 5) nextScreen()
    }, 7000)
  }

  if (currentScreen === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative w-full max-w-sm mx-auto">
            <img
              src="/hero-image-new.png"
              alt="Atenção Mãe - Mulher feliz com dinheiro"
              className="w-full h-auto rounded-lg shadow-2xl object-cover max-h-72 sm:max-h-80"
            />
          </div>

          <div className="space-y-4 px-2">
            <h1 className="sm:text-xl font-bold leading-tight text-amber-50 text-lg leading-5 text-center">
              Você está prestes a entrar em um ambiente secreto que vem mudando a vida de centenas de mulheres comuns,
              que hoje estão faturando <strong className="text-secondary">R$100 a R$200 por dia!</strong> Sem patrão,
              sem horários, sem sair de casa e apenas com o celular na mão.
            </h1>
            <p className="text-base text-amber-300">
              💡 Se você continuar, estará a um clique de ver, com seus próprios olhos, como funciona o PLANO B que vem
              libertando tantas mulheres.
            </p>
          </div>
          <Button
            onClick={nextScreen}
            className="w-full bg-accent hover:bg-accent/90 text-white py-4 text-lg font-semibold"
          >
            👉 Conhecer Plano B Das Mães
          </Button>
        </div>
      </div>
    )
  }

  if (currentScreen === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative w-full max-w-sm mx-auto">
            <img
              src="/hero-image-new.png"
              alt="Atenção Mãe - Mulher feliz com dinheiro"
              className="w-full h-auto rounded-lg shadow-2xl object-cover max-h-72 sm:max-h-80"
            />
          </div>

          <div className="space-y-4 px-2">
            <h1 className="text-2xl font-bold leading-tight text-amber-50 text-center">
              🎯 <span className="text-yellow-400">SIMULAÇÃO EXCLUSIVA</span>
            </h1>

            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 space-y-3">
              <p className="text-amber-100 text-sm leading-relaxed">
                Você está prestes a vivenciar <strong className="text-yellow-400">na prática</strong> como funciona a
                rotina de quem já adquiriu o <strong className="text-yellow-400">PLANO B DAS MÃES</strong> e está
                faturando todos os dias.
              </p>

              <div className="space-y-2 text-left">
                <div className="flex items-center space-x-2">
                  <PlayCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-amber-100">1º Demonstração: Respondendo emails</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PlayCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-amber-100">2º Demonstração: Atendendo no WhatsApp</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PlayCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-amber-100">3º Demonstração: Respondendo pedidos</span>
                </div>
              </div>

              <div className="bg-green-900/40 border border-green-500/50 rounded p-3">
                <p className="text-green-300 text-xs font-medium">
                  ✅ Você NÃO precisa gastar nada
                  <br />✅ Você NÃO precisa vender nada
                  <br />✅ Você NÃO precisa mostrar o rosto
                  <br />✅ Apenas responder e ganhar dinheiro!
                </p>
              </div>
            </div>

            <p className="text-amber-300 text-sm">
              💡 Esta é uma simulação real do que você faria no seu dia a dia como membro.
            </p>
          </div>

          <Button
            onClick={nextScreen}
            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-4 text-lg font-semibold shadow-lg"
          >
            🚀 Começar Experiência
          </Button>
        </div>
      </div>
    )
  }

  if (currentScreen === 3) {
    const emails = [
      {
        from: "Maria Helena",
        subject: "Dúvida sobre produto",
        preview: "Olá, gostaria de saber mais sobre...",
        fullMessage: "Olá! Vi seu produto no Instagram e fiquei muito interessada. Ele tem garantia?",
        responses: [
          "Oi Maria! Sim tem garantia!",
          "Olá! Legal que gostou! Garantia de 30 dias",
          "Oi! Garantia apenas de 30 dias",
        ],
      },
      {
        from: "Ana Silva",
        subject: "Informações",
        preview: "Preciso de ajuda com...",
        fullMessage: "Oi! Preciso de ajuda para entender melhor como funciona o sistema. É realmente confiável?",
        responses: [
          "Oi Ana! Nosso sistema é 100% confiável.",
          "Olá! Sim, milhares de clientes satisfeitas.",
          "Oi! A segurança é nossa prioridade!",
        ],
      },
      {
        from: "Carla Santos",
        subject: "Pedido",
        preview: "Quero fazer um pedido...",
        fullMessage: "Oi! Quero fazer um pedido do produto que vi no site. Está disponível?",
        responses: [
          "Oi! Todos os produtos do site estão disponíveis.",
          "Olá! Sim está disponível.",
          "Oi! Sim, pode fazer o pedido direto no site.",
        ],
      },
    ]

    if (selectedEmail !== null) {
      const email = emails[selectedEmail]
      return (
        <div className="min-h-screen bg-background p-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-red-500 text-white p-4 flex items-center space-x-3">
                <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={() => setSelectedEmail(null)} />
                <Mail className="w-6 h-6" />
                <span className="font-semibold">Gmail</span>
              </div>

              <div className="p-4 space-y-4">
                <div className="border-b pb-4">
                  <div className="font-semibold text-lg">{email.subject}</div>
                  <div className="text-sm text-gray-600">De: {email.from}</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm">{email.fullMessage}</p>
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-sm">Escolha sua resposta:</p>
                  {email.responses.map((response, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start text-xs p-3 h-auto bg-transparent"
                      onClick={() => handleEmailResponse(selectedEmail, index)}
                    >
                      <Send className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-left">{response}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-red-500 text-white p-4 flex items-center space-x-3">
              <Mail className="w-6 h-6" />
              <span className="font-semibold">Gmail</span>
            </div>

            <div className="divide-y">
              {emails.map((email, index) => (
                <div
                  key={index}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    respondedEmails.includes(index) ? "bg-green-50" : ""
                  }`}
                  onClick={() => !respondedEmails.includes(index) && setSelectedEmail(index)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="font-semibold text-sm">{email.from}</div>
                        {respondedEmails.includes(index) && <Check className="w-4 h-4 text-green-600" />}
                      </div>
                      <div className="text-sm text-gray-600">{email.subject}</div>
                      <div className="text-xs text-gray-500 mt-1">{email.preview}</div>
                      {respondedEmails.includes(index) && (
                        <div className="text-xs text-green-600 mt-1 font-medium">✅ Respondido - R$12,00 recebido!</div>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">2h</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {respondedEmails.length > 0 && (
            <div className="mt-6 text-center space-y-4">
              <Progress value={progress} className="w-full" />
              <div className="text-sm text-muted-foreground bg-green-50 p-4 rounded-lg border border-green-200">
                <strong>Viu como é simples?</strong>
                <br />
                Você não precisa escrever nada, só seguir os passos que já vêm prontos no sistema.
                <br />
                <strong>Cada resposta é dinheiro no bolso!</strong>
                <br />
                <div className="mt-2 text-xs text-gray-600">
                  Emails respondidos: {respondedEmails.length}/3
                  {respondedEmails.length < 3 && " - Continue respondendo para avançar!"}
                </div>
              </div>
            </div>
          )}
        </div>

        {showEarnings && (
          <div className="fixed top-4 right-4 bg-accent text-white px-4 py-2 rounded-lg shadow-lg animate-bounce z-50">
            +R${earnings.toFixed(2)} faturado! 💰
          </div>
        )}
      </div>
    )
  }

  if (currentScreen === 4) {
    if (selectedWhatsAppChat !== null) {
      const chat = whatsappChats[selectedWhatsAppChat]
      return (
        <div className="min-h-screen bg-gray-100">
          <div className="bg-green-500 text-white p-4 flex items-center space-x-3">
            <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={() => setSelectedWhatsAppChat(null)} />
            <img
              src={chat.avatar || "/placeholder.svg"}
              alt={chat.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="font-semibold">{chat.name}</div>
              <div className="text-xs opacity-75">{isTyping ? "digitando..." : "online"}</div>
            </div>
          </div>

          <div className="p-4 space-y-4 min-h-96 bg-gray-50">
            <div className="flex justify-start">
              <div className="bg-white rounded-lg p-3 max-w-xs shadow-sm">
                <p className="text-sm">{chat.question}</p>
                <span className="text-xs text-gray-500">14:30</span>
              </div>
            </div>

            {showUserResponse && (
              <div className="flex justify-end">
                <div className="bg-green-500 text-white rounded-lg p-3 max-w-xs shadow-sm">
                  <p className="text-sm">{userResponse}</p>
                  <span className="text-xs opacity-75">14:32</span>
                </div>
              </div>
            )}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {showThankYou && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg p-3 max-w-xs shadow-sm">
                  <p className="text-sm">Muito Obrigada! 😊</p>
                  <span className="text-xs text-gray-500">14:35</span>
                </div>
              </div>
            )}

            {!isTyping && !showThankYou && !showUserResponse && (
              <div className="space-y-2 pt-4">
                <p className="text-sm font-medium text-gray-600">Escolha sua resposta:</p>
                {chat.responses.map((response, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start bg-green-100 border-green-300 hover:bg-green-200 text-xs p-3 h-auto"
                    onClick={() => handleWhatsAppResponse(selectedWhatsAppChat, index)}
                  >
                    <Send className="w-4 h-4 mr-2 flex-shrink-0 text-green-600" />
                    <span className="text-left">{response}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-green-500 text-white p-4 flex items-center space-x-3">
          <MessageCircle className="w-6 h-6" />
          <div>
            <div className="font-semibold">WhatsApp Business</div>
            <div className="text-xs opacity-75">3 conversas ativas</div>
          </div>
        </div>

        <div className="bg-white divide-y">
          {whatsappChats.map((chat, index) => (
            <div
              key={index}
              className={`p-4 hover:bg-gray-50 cursor-pointer flex items-center space-x-3 ${
                respondedChats.includes(index) ? "bg-green-50" : ""
              }`}
              onClick={() => !respondedChats.includes(index) && setSelectedWhatsAppChat(index)}
            >
              <img
                src={chat.avatar || "/placeholder.svg"}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <div className="font-semibold text-sm">{chat.name}</div>
                    {respondedChats.includes(index) && <Check className="w-4 h-4 text-green-600" />}
                  </div>
                  <div className="text-xs text-gray-500">{chat.time}</div>
                </div>
                <div className="text-sm text-gray-600 mt-1">{chat.lastMessage}</div>
                {respondedChats.includes(index) && (
                  <div className="text-xs text-green-600 mt-1 font-medium">✅ Respondido - R$15,00 recebido!</div>
                )}
              </div>
              {!respondedChats.includes(index) && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {respondedChats.length > 0 && (
          <div className="p-4 space-y-4">
            <Progress value={progress} className="w-full" />
            <div className="text-sm text-center bg-green-50 p-4 rounded-lg border border-green-200">
              <strong>Você só precisa escolher a mensagen já pronta e enviar.</strong>
              <br />
              Simples, rápido e direto.
              <br />
              <strong>Enquanto isso, o dinheiro não para de pingar!</strong>
              <br />
              <div className="mt-2 text-xs text-gray-600">
                Conversas respondidas: {respondedChats.length}/3
                {respondedChats.length < 3 && " - Continue respondendo para avançar!"}
              </div>
            </div>
          </div>
        )}

        {showEarnings && (
          <div className="fixed top-4 right-4 bg-accent text-white px-4 py-2 rounded-lg shadow-lg animate-bounce z-50">
            +R${earnings.toFixed(2)} faturado! 💰
          </div>
        )}
      </div>
    )
  }

  if (currentScreen === 5) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-4 flex items-center space-x-3">
              <Package className="w-6 h-6" />
              <span className="font-semibold">Novo Pedido</span>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg">Pedido #{Math.floor(Math.random() * 10000)}</h3>
                <p className="text-sm text-gray-600">Cliente: {orderData.customerName}</p>
                <p className="text-sm text-gray-600">Produto: {orderData.product}</p>
                <p className="font-semibold text-green-600">{orderData.value}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Mensagem da cliente:</p>
                <p className="text-sm text-gray-700">{orderData.question}</p>
              </div>

              {!orderResponded && (
                <div className="space-y-2">
                  <p className="font-medium text-sm">Escolha sua resposta:</p>
                  {orderData.responses.map((response, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start text-xs p-3 h-auto bg-blue-50 border-blue-200 hover:bg-blue-100"
                      onClick={() => handleOrderResponse(index)}
                    >
                      <Send className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" />
                      <span className="text-left">{response}</span>
                    </Button>
                  ))}
                </div>
              )}

              {orderResponded && (
                <div className="text-center space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <Check className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-green-800">Pedido respondido com sucesso!</p>
                    <p className="text-xs text-green-600 mt-1">+R$54,00 recebido!</p>
                  </div>

                  <Progress value={progress} className="w-full" />

                  <div className="text-sm bg-green-50 p-4 rounded-lg border border-green-200">
                    <strong>Você só precisa escolher a mensagen já pronta e enviar.</strong>
                    <br />
                    Simples, rápido e direto.
                    <br />
                    <strong>Enquanto isso, o dinheiro não para de pingar!</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {showEarnings && (
          <div className="fixed top-4 right-4 bg-accent text-white px-4 py-2 rounded-lg shadow-lg animate-bounce z-50">
            +R${earnings.toFixed(2)} faturado! 💰
          </div>
        )}
      </div>
    )
  }

  if (currentScreen === 6) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-6">
            <Calculator className="w-20 h-20 mx-auto text-green-500 animate-pulse" />

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Processando seus resultados...</h2>

              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <Progress value={loadingProgress} className="w-full h-3" />
                <p className="text-green-400 font-medium">{loadingText}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-300">Emails</span>
                  </div>
                  <div className="text-white font-bold">3 respondidos</div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-300">WhatsApp</span>
                  </div>
                  <div className="text-white font-bold">3 atendimentos</div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-300">Pedidos</span>
                  </div>
                  <div className="text-white font-bold">1 respondido</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-gray-400 text-sm">Aguarde enquanto calculamos seus ganhos...</div>
        </div>
      </div>
    )
  }

  if (currentScreen === 7) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-6">
            <Clock className="w-20 h-20 mx-auto text-secondary" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">2 horas trabalhadas</h2>
              <div className="text-4xl font-bold text-accent">R$ 135,00</div>
              <p className="text-lg text-muted-foreground">faturados hoje</p>
            </div>
          </div>

          <div className="space-y-4 text-center">
            <p className="font-extrabold text-3xl">
              Agora multiplique isso por 30 dias…
              <br />
              Nós estamos falando de <strong className="text-accent">R$ 4.050,00</strong> em casa, só usando o celular.
            </p>
            <p className="text-accent font-medium text-base">Sem patrão, sem chefe e no seu tempo!</p>
          </div>

          <Button
            onClick={nextScreen}
            className="w-full bg-accent hover:bg-accent/90 text-white py-4 text-lg font-semibold"
          >
            Quero Começar Hoje!
          </Button>
        </div>
      </div>
    )
  }

  if (currentScreen === 8) {
    if (pixData) {
      return (
        <div className="min-h-screen bg-black text-white p-4 flex items-center justify-center">
          <div className="max-w-md w-full bg-gray-900 rounded-lg p-6 space-y-6">
            <div className="text-center">
              <QrCode className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h2 className="text-xl font-bold mb-2">Pagamento PIX</h2>
              <p className="text-green-400 text-2xl font-bold">R$ 25,00</p>
              <p className="text-sm text-gray-400 mt-2">
                Status: <span className="text-green-400">{pixData.status}</span>
              </p>
            </div>

            {pixData.pix?.payload && (
              <div className="bg-white p-4 rounded-lg">
                <div className="w-full max-w-xs mx-auto bg-white p-4 rounded-lg">
                  <div className="text-center text-black text-xs mb-2">Escaneie o QR Code</div>
                  <div className="w-48 h-48 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-gray-600" />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-sm text-center">Ou copie o código PIX:</p>
              <div className="bg-gray-800 p-3 rounded-lg flex items-center space-x-2">
                <code className="flex-1 text-xs break-all">{pixData.pix?.payload}</code>
                <Button size="sm" onClick={copyPixCode} className="bg-green-600 hover:bg-green-700">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-400">Após o pagamento, você receberá acesso imediato</p>
              <p className="text-xs text-gray-500">ID: {pixData.id}</p>
              <Button onClick={() => setPixData(null)} variant="outline" className="w-full">
                Voltar
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-black text-white p-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-6">
          <AlertTriangle className="w-16 h-16 mx-auto text-red-500" />

          <div className="space-y-4">
            <h1 className="font-bold text-red-500 text-4xl">Atenção ⚠️</h1>

            <div className="space-y-4 leading-relaxed text-base font-medium">
              <p>
                {
                  "Você acabou de ver com seus próprios olhos que é possível colocar dinheiro no bolso, de verdade, sem sair de casa.\n\nMas vamos usar a sinceridade: se você fechar essa página agora, sua vida vai continuar exatamente igual."
                }
              </p>

              <p className="">
                Não é porque você não se esforçou.
                <br />O problema é que sempre te ensinaram a trocar tempo por dinheiro… e esse sistema foi feito para te
                deixar presa, cansada e sem saída.
              </p>

              <p>
                Com o <strong className="text-secondary">PLANO B DAS MÃES</strong>, você vai descobrir um método simples
                que já está gerando PIX todos os dias para mulheres comuns – mesmo sem experiência, sem precisar vender
                nada e principalmente sem deixar os filhos de lado.
                <br />{" "}
              </p>

              <p>
                👉 Agora ATENÇÃO: as inscrições para o <strong className="text-secondary">PLANO B DAS MÃES</strong>{" "}
                estão abertas, mas só até completar o limite de vagas.
                <br />
              </p>

              <p className="text-red-400">Se não for agora, provavelmente nunca mais será.</p>
            </div>
          </div>

          <div className="bg-red-900/50 border border-red-500 rounded-lg p-4">
            <div className="text-red-400 text-sm">Tempo restante para garantir sua vaga:</div>
            <div className="text-3xl font-bold text-red-500">{formatTime(countdown)}</div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => window.open("https://pay.meupagamentoseguro.space/rlutCYAw", "_blank")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-xl font-bold animate-pulse shadow-lg shadow-green-500/50 border-2 border-green-400"
              style={{
                animation: "pulse 1.5s infinite, glow 2s ease-in-out infinite alternate",
              }}
            >
              ATIVAR MEU PLANO B AGORA!
            </Button>

            <p className="text-green-400 text-lg font-semibold animate-bounce">👆 CLIQUE AQUI E GARANTE SUA VAGA!</p>
          </div>

          <p className="text-xs text-gray-400">
            ⚠️ O acesso é limitado. A qualquer momento este portal pode sair do ar. ⏳
          </p>
        </div>

        <style jsx>{`
          @keyframes glow {
            from {
              box-shadow: 0 0 20px #10b981, 0 0 30px #10b981, 0 0 40px #10b981;
            }
            to {
              box-shadow: 0 0 30px #10b981, 0 0 40px #10b981, 0 0 50px #10b981;
            }
          }
        `}</style>
      </div>
    )
  }

  return null
}
