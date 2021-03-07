const tabs = (parentSelector, tabsSelector, contentSelector, activeClass, display = 'block') => {
  const tabsParent = document.querySelector(parentSelector),
        tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(contentSelector);

  function hideTabContent() {      
      tabsContent.forEach(item => {
          item.style.display = 'none';
      });
      tabs.forEach(item => {
          item.classList.remove(activeClass);
      });
  }

  function showTabContent(i = 0) {
      tabsContent[i].style.display = display;
      tabs[i].classList.add(activeClass);
  }
  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;
    if(target && (target.classList.contains(tabsSelector.replace(/\./, '')) ||   target.parentNode.classList.contains(tabsSelector.replace(/\./, '')))) {
        tabs.forEach((item, i) => {
            if (target === item || target.parentNode === item) {
                hideTabContent();
                showTabContent(i);
            }
      });
    }
  }); 

};

export default tabs;