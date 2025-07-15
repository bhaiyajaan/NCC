let players = JSON.parse(localStorage.getItem("players") || "[]");
let currentCaptain = null;
let currentIndex = -1;

if (document.getElementById("playerForm")) {
  document.getElementById("playerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("pname").value;
    const age = document.getElementById("age").value;
    const role = document.getElementById("role").value;
    const basePrice = parseInt(document.getElementById("basePrice").value);

    players.push({
      name,
      age,
      role,
      basePrice,
      highestBid: basePrice,
      highestBidder: null,
      status: "waiting"
    });

    localStorage.setItem("players", JSON.stringify(players));
    alert("Player Registered!");
    this.reset();
  });
}

function loginCaptain() {
  const name = document.getElementById("captainName").value.trim().toLowerCase();
  if (name === "captain1" || name === "captain2") {
    currentCaptain = name;
    document.getElementById("auctionArea").style.display = "block";
    alert(name + " logged in!");
    if (currentIndex === -1) {
      currentIndex = getRandomPlayerIndex();
    }
    showCurrentPlayer();
  } else {
    alert("Only Captain1 or Captain2 can login.");
  }
}

function getRandomPlayerIndex() {
  const available = players.filter(p => p.status === "waiting");
  if (available.length === 0) return -1;
  const randomIndex = Math.floor(Math.random() * available.length);
  return players.findIndex(p => p.name === available[randomIndex].name);
}

function showCurrentPlayer() {
  const card = document.getElementById("playerCard");
  if (currentIndex === -1 || !players[currentIndex]) {
    card.innerHTML = "<p>No more players available.</p>";
    return;
  }
  const player = players[currentIndex];
  card.innerHTML = `
    <strong>${player.name}</strong><br>
    Age: ${player.age}<br>
    Role: ${player.role}<br>
    Base Price: ₹${player.basePrice}<br>
    Highest Bid: ₹${player.highestBid} (${player.highestBidder || "None"})
  `;
}

function placeBid() {
  if (currentIndex === -1) return;
  players[currentIndex].highestBid += 100000;
  players[currentIndex].highestBidder = currentCaptain;
  localStorage.setItem("players", JSON.stringify(players));
  showCurrentPlayer();
}

function markOut() {
  if (currentIndex === -1) return;
  players[currentIndex].status = "sold";
  localStorage.setItem("players", JSON.stringify(players));
  currentIndex = getRandomPlayerIndex();
  showCurrentPlayer();
}