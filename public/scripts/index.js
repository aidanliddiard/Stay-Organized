window.addEventListener("load", function () {
  const userId = sessionStorage.getItem("user-id");
  const welcomeDescription = document.getElementById("welcomeDescription");
  const signedInDescription = document.getElementById("signedInDesciption");

  signedInDescription.style.display = userId ? "block" : "none";
  welcomeDescription.style.display = userId ? "none" : "block";
});
