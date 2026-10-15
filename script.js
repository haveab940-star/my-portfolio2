const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('task') || '1';

const taskHeaderTitle = document.getElementById('task-header-title');
const taskDescText = document.getElementById('task-desc-text');
const taskExample = document.getElementById('task-example');
const codeEditor = document.getElementById('code-editor');

// Тапсырмаларды автоматты түрде конфигурациялау
const tasksConfig = {
    '1': {
        title: "1-есеп: Сан цифрларының қосындысы",
        desc: "`sum_digits(n)` функциясын жазыңыз. Функция <code>while</code> циклін қолдана отырып, берілген санның цифрларының қосындысын қайтаруы тиіс.",
        example: "sum_digits(345) -> 12 (3+4+5)",
        defaultCode: `def sum_digits(n):\n    s = 0\n    while n > 0:\n        s += n % 10\n        n = n // 10\n    return s`,
        validator: (code) => code.includes('while') && code.includes('% 10') && code.includes('// 10')
    },
    '2': {
        title: "2-есеп: Санды кері ретпен жазу",
        desc: "Берілген натурал санның цифрларын кері тәртіппен орналастырып қайтаратын <code>reverse_number(n)</code> функциясын құрыңыз.",
        example: "reverse_number(1234) -> 4321",
        defaultCode: `def reverse_number(n):\n    rev = 0\n    while n > 0:\n        digit = n % 10\n        rev = rev * 10 + digit\n        n = n // 10\n    return rev`,
        validator: (code) => code.includes('while') && code.includes('% 10') && code.includes('* 10')
    },
    '3': {
        title: "3-есеп: Нөл енгізгенге дейінгі қосынды",
        desc: "Пайдаланушыдан <code>0</code> енгізілгенге дейін сандарды сұрап, барлық енгізілген сандардың жалпы қосындысын есептейтін цикл құрыңыз.",
        example: "Енгізілгендер: 5, 3, 2, 0 -> Қосынды: 10",
        defaultCode: `s = 0\nn = int(input("Сан енгізіңіз (0 - тоқтау): "))\nwhile n != 0:\n    s += n\n    n = int(input("Сан енгізіңіз: "))\nprint(s)`,
        validator: (code) => code.includes('while') && (code.includes('!= 0') || code.includes('!== 0')) && code.includes('+=')
    },
    '4': {
        title: "4-есеп: Санның цифрлар санын табу",
        desc: "Берілген натурал санның неше цифрдан тұратынын <code>while</code> циклі арқылы есептейтін <code>count_digits(n)</code> функциясын жазыңыз.",
        example: "count_digits(7584) -> 4",
        defaultCode: `def count_digits(n):\n    count = 0\n    while n > 0:\n        count += 1\n        n = n // 10\n    return count`,
        validator: (code) => code.includes('while') && code.includes('// 10') && (code.includes('count += 1') || code.includes('count+=1'))
    }
};

// Ағымдағы тапсырманы жүктеу
const currentTask = tasksConfig[taskId] || tasksConfig['1'];
taskHeaderTitle.textContent = currentTask.title;
taskDescText.innerHTML = currentTask.desc;
taskExample.textContent = "Күтілетін нәтиже: " + currentTask.example;
codeEditor.value = currentTask.defaultCode;

// Тексеру батырмасының жұмысы
document.getElementById('run-btn').addEventListener('click', () => {
    const code = codeEditor.value;
    const resultBox = document.getElementById('result-box');
    const resultHeading = document.getElementById('result-heading');
    const resultDesc = document.getElementById('result-desc');

    resultBox.classList.remove('hidden');

    const hasWhile = code.includes('while');
    const isLogicValid = currentTask.validator(code);

    if (hasWhile && isLogicValid) {
        resultBox.className = "p-4 rounded-xl border bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-lg";
        resultHeading.textContent = "✅ Тапсырма тамаша орындалды! (Баға: 100/100)";
        resultDesc.textContent = "Барлық тесттер мен шарттар сәтті өтті. While циклі дұрыс жазылған.";
    } else if (!hasWhile) {
        resultBox.className = "p-4 rounded-xl border bg-amber-950/40 border-amber-500/50 text-amber-300 shadow-lg";
        resultHeading.textContent = "⚠️ Ескерту: While циклі табылмады";
        resultDesc.textContent = "Тапсырма шарты бойынша міндетті түрде 'while' операторын қолдануыңыз қажет.";
    } else {
        resultBox.className = "p-4 rounded-xl border bg-rose-950/40 border-rose-500/50 text-rose-300 shadow-lg";
        resultHeading.textContent = "❌ Қате бар (Тесттен өтпеді)";
        resultDesc.textContent = "Кодтағы математикалық немесе логикалық амалдар талапқа сай келмеді. Қайта тексеріңіз.";
    }
});