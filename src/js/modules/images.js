const images = () => {
  const imgPopup = document.createElement('div'),
        workSection = document.querySelector('.works'),
        bigImg = document.createElement('img');
      
  imgPopup.classList.add('popup');
  workSection.appendChild(imgPopup);

  imgPopup.appendChild(bigImg);

  imgPopup.style.justifyContent = 'center';
  imgPopup.style.alignContent = 'center';
  imgPopup.style.display = 'none';

  workSection.addEventListener('click', (e) => {
    e.preventDefault();

    let target = e.target;

    if (target && target.classList.contains('preview')) {
      imgPopup.style.display = 'flex';
      const path = target.parentNode.getAttribute('href');
      bigImg.setAttribute('src', path);
      document.body.style.overflow = 'hidden';
    }
    
    if (target && target.matches('div.popup')) {
      imgPopup.style.display = 'none';
    }
    

  });

};

export default images;