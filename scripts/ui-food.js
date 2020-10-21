document.getElementById('add-ingredient').addEventListener('click', (e) => {
    const div = document.createElement('div');
    const div1 = document.createElement('div');
    div.classList.add('singular-row');
    div1.classList.add('singular-row');
    const span = document.createElement('span');
    span.innerText="Składnik:";
    const select = document.createElement('select');
    select.classList.add('double-row');
    select.setAttribute('name', 'food-type');
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.innerText="arbuz";
    option2.innerText="ananas";
    select.appendChild(option1);
    select.appendChild(option2);
    div.appendChild(span);
    div.appendChild(select);
    const text = document.createTextNode('Ilość (g): ');
    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.classList.add('double-row');
    div1.appendChild(text);
    div1.appendChild(input);
    document.querySelector('.info-center .regular-row:nth-child(2)').insertBefore(div1, e.target);
    document.querySelector('.info-center .regular-row:nth-child(2)').insertBefore(div, e.target);
})