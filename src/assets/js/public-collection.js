import * as Utils from "./utils.js";
// After generating cards
function setupCardModal() {
    const modal = document.getElementById("cardInfoDialog");
    const modalClose = document.getElementById("modalClose");
    const modalImage = document.getElementById("modalImage");
    const modalName = document.getElementById("modalName");
    const modalCategory = document.getElementById("modalCategory");
    const modalDescription = document.getElementById("modalDescription");

    document.getElementById("items").addEventListener("click", (e) => {
        const card = e.target.closest(".card");
        if (!card) return;

        modalImage.src = card.querySelector(".item-image").src;
        modalName.textContent = card.querySelector(".item-name").textContent;
        modalCategory.textContent =
            card.querySelector(".item-category").textContent;
        modalDescription.textContent = card.dataset.description || "";

        modal.classList.remove("hidden");
        modal.classList.add("flex");
    });

    modalClose.addEventListener("click", () => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    });

    // Close when clicking outside the modal content
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
        }
    });
}
const cards = [
    {
        id: "1",
        name: "Fireball",
        description: "Deals direct fire damage to the opponent.",
        category: "spell",
    },
    {
        id: "2",
        name: "Trap Hole",
        description: "Destroys an attacking monster when it is summoned.",
        category: "trap",
    },
    {
        id: "3",
        name: "Magic Shield",
        description: "Blocks one incoming attack.",
        category: "spell",
    },
    {
        id: "4",
        name: "Pitfall",
        description: "Captures an opponent's monster and removes it from play.",
        category: "trap",
    },
    {
        id: "5",
        name: "Lightning Bolt",
        description: "A fast spell that strikes instantly.",
        category: "spell",
    },
    {
        id: "6",
        name: "Mirror Trap",
        description: "Reflects damage back to the attacker.",
        category: "trap",
    },
    {
        id: "7",
        name: "Stone Golem",
        description: "A sturdy monster with high defense.",
        category: "monster",
    },
    {
        id: "8",
        name: "Shadow Assassin",
        description: "A swift monster that attacks from the shadows.",
        category: "monster",
    },
    {
        id: "9",
        name: "Healing Light",
        description: "Restores health to the player.",
        category: "spell",
    },
    {
        id: "10",
        name: "Explosive Rune",
        description: "Triggers an explosion when an enemy acts.",
        category: "trap",
    },
];
document.addEventListener("DOMContentLoaded", async () => {
    const itemsContainer = document.getElementById("items");
    const template = document.getElementById("item-template");
    const categorySelect = document.getElementById("categorySelect");

    // Populate category select
    const categories = [...new Set(cards.map((c) => c.category))];
    categories.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        categorySelect.appendChild(option);
    });

    function renderCards(filteredCards) {
        itemsContainer.innerHTML = "";
        filteredCards.forEach((card) => {
            const clone = template.content.cloneNode(true);
            clone.querySelector(".item-image").src =
                "images/cards/default.avif";
            clone.querySelector(".item-image").alt = card.name;
            clone.querySelector(".item-name").textContent = card.name;
            clone.querySelector(".item-category").textContent = card.category;
            itemsContainer.appendChild(clone);
        });
    }

    renderCards(cards);

    categorySelect.addEventListener("change", () => {
        const value = categorySelect.value;
        if (value === "all") renderCards(cards);
        else renderCards(cards.filter((c) => c.category === value));
    }); // Call after cards are rendered

    await Utils.loadDialog("templates/card-info-dialog.html", "cardInfoDialog");
    setupCardModal();
    Utils.applyLanguage(Utils.language());
});
