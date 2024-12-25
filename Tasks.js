// TASK 1
// Завдання: отримання даних про користувачів 
// За допомогою засобі Fetch отримати інформацію про користувачів
// за посиланням - https://jsonplaceholder.typicode.com/users 
// Імена користувачів відобразити в ненумерованому списку ul.usersList,
// який створений у файлі index.html
// Запустити програму за допомогою Live Server
// Перевірити за допомогою команди npm tests/task1.test.js 
document.addEventListener("DOMContentLoaded", () => {
    const usersList = document.querySelector('.usersList');

    
    async function fetchUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const users = await response.json();
            displayUsers(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    
    function displayUsers(users) {
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = user.name;
            usersList.appendChild(listItem);
        });
    }

    
    fetchUsers();
});

// =======================================================================================
// TASK 2
// На сторінці index.html знаходяться поля зазначені коментарем Task2
// При введені імені користувача в поле #userNameInput та натиску на кнопку
// #getUserButton потрібно зробити запит Fetch за посиланням - https://jsonplaceholder.typicode.com/users
// Віднайти користувача із введеним ім'ям, отримати місто його проживанння та
// відобразити у тезі #userCity
// Запустити програму потрібно за допомогою Live Server
// Перевірити правильність програми - команда node tests/task2.test.js
document.addEventListener("DOMContentLoaded", () => {
    const userNameInput = document.getElementById('userNameInput');
    const getUserButton = document.getElementById('getUserButton');
    const userCity = document.getElementById('userCity');

    
    async function fetchUserCity(userName) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const users = await response.json();
            
            const user = users.find(user => user.name.toLowerCase() === userName.toLowerCase());
            
            
            if (user) {
                userCity.textContent = user.address.city;
            } else {
                userCity.textContent = 'User not found';
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            userCity.textContent = 'Error fetching data';
        }
    }

    
    getUserButton.addEventListener('click', () => {
        const userName = userNameInput.value.trim();
        if (userName) {
            fetchUserCity(userName);
        } else {
            userCity.textContent = 'Please enter a user name';
        }
    });
});
