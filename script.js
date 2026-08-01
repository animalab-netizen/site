const tabGroups = document.querySelectorAll("[data-tabs]");

tabGroups.forEach((tabGroup) => {
  const tabs = Array.from(tabGroup.querySelectorAll('[role="tab"]'));
  const panels = Array.from(tabGroup.querySelectorAll('[role="tabpanel"]'));

  const selectTab = (selectedTab, moveFocus = false) => {
    tabs.forEach((tab) => {
      const isSelected = tab === selectedTab;
      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.id !== selectedTab.getAttribute("aria-controls");
    });

    if (moveFocus) {
      selectedTab.focus();
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
        return;
      }

      event.preventDefault();
      const nextIndex =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? tabs.length - 1
            : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;

      selectTab(tabs[nextIndex], true);
    });
  });
});
