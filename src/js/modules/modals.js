const modals = (state) => {
  function bindModals(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
    const trigger = document.querySelectorAll(triggerSelector),
          openModal = document.querySelector(modalSelector),
          closeModal = document.querySelector(closeSelector),
          windows = document.querySelectorAll('[data-modal]'),
          scroll = calcScroll();

    trigger.forEach(item => {
      item.addEventListener('click', (e) => {
        if(e.target) {
          e.preventDefault();
        }
        if (openModal.classList.contains('popup_calc_profile')) {
          if (!state.width || !state.heigth) {
            alert('Заполните все поля');
            return;
          }
        }
        
        if (openModal.classList.contains('popup_calc_end')) {
          if (!state.profile) {
            alert('Заполните все поля');
            return;
          }
        }

        //Все модальные окна скрыты на странице
        windows.forEach(item => {
          item.style.display = 'none';
        });

        //Модальное окно отображается на странице
        openModal.style.display = 'block';
        //Для блокировки скролла страницы при открытом модальном окне
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
        // document.body.classList.add('modal-open');
      });
    });

    closeModal.addEventListener('click', () => {
      windows.forEach(item => {
        item.style.display = 'none';
      });

      openModal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.marginRight = '0px';
      // document.body.classList.remove('modal-open');
    });

    openModal.addEventListener('click', (e) => {
      if(e.target === openModal && closeClickOverlay) {
        windows.forEach(item => {
          item.style.display = 'none';
        });
        openModal.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.marginRight = '0px';
        // document.body.classList.remove('modal-open');
        clearInterval(modalTimerId);
      }
    });
  }

  function modalTimerId (selector, time) {
    setTimeout(function() {
      document.querySelector(selector).style.display = 'block';
      document.body.style.overflow = 'hidden';
    }, time);
  }
  
  function calcScroll () {
    let div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflow = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  bindModals('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModals('.phone_link', '.popup', '.popup .popup_close');
  bindModals('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
  bindModals('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
  bindModals('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
  modalTimerId('.popup', 6000000);
};

export default modals;