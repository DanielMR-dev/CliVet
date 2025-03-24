import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"

// Preguntas y respuestas predeterminadas
const predefinedQA = [
    {
        question: "¿Cuál es el horario de atención?",
        answer: "Nuestro horario de atención es de lunes a viernes de 7:00 AM a 6:00 PM, y sábados de 7:00 AM a 2:00 PM.",
    },
    {
        question: "¿Ofrecen servicios de emergencia?",
        answer: "Sí, ofrecemos servicios de emergencia durante nuestro horario de atención. Para emergencias fuera de horario, por favor contacte a nuestra línea de emergencia.",
    },
    {
        question: "¿Qué servicios ofrecen?",
        answer: "Ofrecemos consultas, cirugías, peluquería, hospitalización, vacunación y servicio de guardería para mascotas.",
    },
    {
        question: "¿Cómo puedo agendar una cita?",
        answer: "Puede agendar una cita registrándose en nuestra plataforma o llamando directamente a nuestro número de contacto.",
    },
    {
        question: "¿Cuánto cuesta la guardería?",
        answer: "El costo de la guardería depende del peso de su mascota y el tiempo de estancia. Puede obtener un cálculo preciso en nuestra sección de guardería.",
    },
];

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "¡Hola! Soy el asistente virtual de CliVet. ¿En qué puedo ayudarte hoy?", isBot: true },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    };

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    const handleSend = () => {
        if (input.trim() === "") return;

        setMessages((prev) => [...prev, { text: input, isBot: false }]);
        setInput("");

        // Buscar una respuesta predefinida
        const matchedQA = predefinedQA.find(
            (qa) =>
                qa.question.toLowerCase().includes(input.toLowerCase()) ||
                input.toLowerCase().includes(qa.question.toLowerCase()),
        )

        setTimeout(() => {
            if (matchedQA) {
                setMessages((prev) => [...prev, { text: matchedQA.answer, isBot: true }])
            } else {
                setMessages((prev) => [
                ...prev,
                { text: "Lo siento, no tengo una respuesta para esa pregunta. ¿Puedo ayudarte con algo más?", isBot: true },
                ])
            }
        }, 500)
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

            {isOpen && (
                <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl z-50 flex flex-col max-h-[500px]">
                    <div className="bg-blue-600 text-white p-4 rounded-t-lg">
                        <h3 className="text-lg font-semibold">Asistente CliVet</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                                <div
                                className={`max-w-[70%] p-2 rounded-lg ${message.isBot ? "bg-gray-200" : "bg-blue-500 text-white"}`}
                                >
                                {message.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="border-t p-4 flex">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Escribe tu pregunta..."
                            className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

