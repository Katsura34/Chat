    async function sendMessage() {
            const userInput = document.getElementById('user-input').value;
            if (!userInput) return;

            appendMessage('You', userInput, 'user-message');
            document.getElementById('user-input').value = '';
            appendLoading();

            try {
                const response = await axios.post('http://localhost:5000/chat', { message: userInput });
                removeLoading();
                appendMessage('Lijit AI', response.data.reply, 'ai-message');
                hljs.highlightAll();
            } catch (error) {
                removeLoading();
                appendMessage('Error', 'Failed to connect to server.', 'ai-message');
            }
        }

        function appendMessage(sender, message, className) {
            const chatBox = document.getElementById('chat-box');
            const messageElement = document.createElement('div');
            messageElement.className = `message ${className}`;
            messageElement.innerHTML = `<strong>${sender}:</strong> ${formatMessage(message)}`;
            chatBox.appendChild(messageElement);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        function formatMessage(message) {
            return message.replace(/```([a-zA-Z]+)\n([\s\S]*?)```/g, (match, lang, code) => {
                return `<pre><code class="language-${lang}">${escapeHtml(code)}</code></pre>`;
            });
        }

        function escapeHtml(unsafe) {
            return unsafe.replace(/&/g, "&amp;")
                         .replace(/</g, "&lt;")
                         .replace(/>/g, "&gt;")
                         .replace(/\"/g, "&quot;")
                         .replace(/'/g, "&#039;");
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        function appendLoading() {
            const chatBox = document.getElementById('chat-box');
            const loadingElement = document.createElement('div');
            loadingElement.id = 'loading';
            loadingElement.className = 'loading';
            loadingElement.textContent = 'AI is typing...';
            chatBox.appendChild(loadingElement);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        function removeLoading() {
            const loadingElement = document.getElementById('loading');
            if (loadingElement) {
                loadingElement.remove();
            }
        }

        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
        }
