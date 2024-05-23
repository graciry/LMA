// script.js

// Function to fetch and display courses
function getCourses() {
    fetch('/courses')
      .then(response => response.json())
      .then(data => {
        const courseList = document.getElementById('courseList');
        courseList.innerHTML = '';
        data.forEach(course => {
          const li = document.createElement('li');
          li.textContent = course.name;
          courseList.appendChild(li);
        });
      })
      .catch(error => console.error('Error fetching courses:', error));
  }
  
  // Function to fetch and display leaderboard
  function getLeaderboard() {
    fetch('/leaderboard')
      .then(response => response.json())
      .then(data => {
        const leaderboardList = document.getElementById('leaderboardList');
        leaderboardList.innerHTML = '';
        data.forEach(entry => {
          const li = document.createElement('li');
          li.textContent = `${entry.name}: ${entry.score}`;
          leaderboardList.appendChild(li);
        });
      })
      .catch(error => console.error('Error fetching leaderboard:', error));
  }
  
  // Event listener to fetch courses when page loads
  document.addEventListener('DOMContentLoaded', getCourses);
  
  // Event listener to fetch leaderboard when page loads
  document.addEventListener('DOMContentLoaded', getLeaderboard);
  