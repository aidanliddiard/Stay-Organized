window.addEventListener("load", function () {
  fetchAllCategories();
});

function fetchAllCategories() {
  fetch("http://localhost:8083/api/categories")
    .then((response) => response.json())
    .then((data) => {
      const categorySelect = document.getElementById("category");
      data.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.name;
        option.innerHTML = category.name;
        categorySelect.append(option);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function createNewTodo(event) {
  event.preventDefault();

  const userId = sessionStorage.getItem("user-id");
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const priority = document.getElementById("priority").value;
  const deadline = document.getElementById("deadline").value;

  fetch("http://localhost:8083/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userid: userId,
      description: description,
      category: category,
      priority: priority,
      deadline: deadline,
    }),
  })
    .then((response) => {
      if (response.ok) {
        showModal("Todo added successfully. Would you like to view all todos?");
      } else {
        return response.json().then((error) => {
          throw error;
        });
      }
    })
    .catch((error) => {
      showModal("Error adding todo. Please try again.");
      console.error(error);
    });

  function showModal(message) {
    document.getElementById("message").innerHTML = message;

    function hideModal() {
      document.getElementById("popup-modal").classList.add("hidden");
    }

    document.getElementById("popup-modal").classList.remove("hidden");

    const closeButton = document.getElementById("close-modal");
    const redirectButton = document.getElementById("redirect");

    if (
      message === "Todo added successfully. Would you like to view all todos?"
    ) {
      closeButton.innerHTML = "Add another todo";
      closeButton.classList.remove("bg-red-600", "hover:bg-red-800");
      closeButton.classList.add("bg-green-500", "hover:bg-green-100");
      redirectButton.classList.remove("hidden");

      closeButton.addEventListener("click", hideModal);
      redirectButton.addEventListener("click", function () {
        window.location.href = "/todos.html";
      });
    } else {
      closeButton.addEventListener("click", hideModal);
    }
  }
}
