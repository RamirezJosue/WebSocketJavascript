var socket = io.connect('http://localhost:8080', { 'forceNew': true });

socket.on('messages', (data) => {
    console.log(data);
    render(data)
});

function render(data) {
    var html = data.map((elem, index) => {
        return (
            `<div>
                <strong>
                    ${elem.author}
                </strong>:
                <em>${elem.text}</em>
            </div>`);
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessages(e) {
    var payload = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };

    socket.emit('new-message', payload);
    return false;
}