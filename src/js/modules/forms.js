import checkNumInputs from './checkNumInputs';

const forms = (state) => {
  const allForms = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

  // if ()

  checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: 'Идет отправка..',
    success: 'Отправлено!',
    failure: 'Ошибка..'
  };

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;
    let result = await fetch(url, {
      method: "POST",
      body: data
    });
    return await result.text();
  };

  // const isEmpty = () => {
  //   inputs.forEach(input => {
  //     if (input.value === '') {
  //       console.log('isEmpty');
  //     }
  //   });
  // };
  // isEmpty();

  // const clearInputs = () => {
  //   inputs.forEach(input => {
  //     input.value = '';
  //   });
  // };

  allForms.forEach(item => {
    item.addEventListener('submit', (e) => {
       
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.appendChild(statusMessage);

      const formData = new FormData(item);
      if (item.getAttribute('data-calc') === 'end') {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }

      postData('assets/server.php', formData)
        .then(result => {
          console.log(result);
          statusMessage.textContent = message.success;
      }).catch((e) => {
          console.log(e);
          statusMessage.textContent = message.failure;
      }).finally(() => {
          item.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 4000);

          //Закрываем окно после ввода всех данных
          if (item.getAttribute('data-calc') === 'end') {
            setTimeout(() => {
              item.closest('.popup_calc_end').style.display = 'none';
              document.body.style.overflow = "scroll";
            }, 6000);            
          }
        state = {};
      });
    });
  });
};

export default forms;