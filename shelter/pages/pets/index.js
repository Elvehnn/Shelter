"use strict";
let pets = []; // 8
let fullPetsList = []; // 48
let numOfCards;
const petsFromJson = [
    {
        "name": "Katrine",
        "img": "../../assets/pets-katrine.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
        "age": "6 months",
        "inoculations": ["panleukopenia"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Jennifer",
        "img": "../../assets/pets-jennifer.png",
        "type": "Dog",
        "breed": "Labrador",
        "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        "age": "2 months",
        "inoculations": ["none"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Woody",
        "img": "../../assets/pets-woody.png",
        "type": "Dog",
        "breed": "Golden Retriever",
        "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
        "age": "3 years 6 months",
        "inoculations": ["adenovirus", " distemper"],
        "diseases": ["right back leg mobility reduced"],
        "parasites": ["none"]
    },
    {
        "name": "Sophia",
        "img": "../../assets/pets-sophia.png",
        "type": "Dog",
        "breed": "Shih tzu",
        "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        "age": "1 month",
        "inoculations": ["parvovirus"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Timmy",
        "img": "../../assets/pets-timmy.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
        "age": "2 years 3 months",
        "inoculations": ["calicivirus", " viral rhinotracheitis"],
        "diseases": ["kidney stones"],
        "parasites": ["none"]
    },
    {
        "name": "Charly",
        "img": "../../assets/pets-charly.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
        "age": "8 years",
        "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
        "diseases": ["deafness", "blindness"],
        "parasites": ["lice", "fleas"]
    },
    {
        "name": "Scarlett",
        "img": "../../assets/pets-scarlet.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
        "age": "3 months",
        "inoculations": ["parainfluenza"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Freddie",
        "img": "../../assets/pets-freddie.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
        "age": "2 months",
        "inoculations": ["rabies"],
        "diseases": ["none"],
        "parasites": ["none"]
    }
];

const petsListJson = JSON.stringify(petsFromJson);
pets = JSON.parse(petsListJson);

const createPets = (petsList) => {
    const elem = document.querySelector("#cards");
    elem.innerHTML = '';
    elem.innerHTML += createElements(petsList);
    fadeIn(elem);
};

const createElements = (petsList) => {
    let str = '';
    for (let i = 0; i < petsList.length; i++) {
      str += `<div class="pet__card id="pet__card">
      <div class="pet__picture"><img src="${petsList[i].img }" alt="${petsList[i].name}"></div>
      <p class="pet__card__title">${petsList[i].name}</p>
      <button type="button" class="pet__card__button" id="pet__card__button">Learn more</button>
    </div>`;
    }
    return str;
  };
  
  function fadeIn(el) {
    let opacity = 0.01;
    // el.style.display = "block";//
    let timer = setInterval(function() {
      if(opacity >= 1) {
       clearInterval(timer);
      }
      el.style.opacity = opacity;
      opacity += opacity * 0.1;
    }, 10);
  }

  //сортировка "восьмерок", "шестерок" и "троек". "тройки" кратны "шестеркам", поэтому в них уже отсортировано//
  const sort863 = (list) => {
    list = sort6recursively(list);
    return list;
  }

  const sort6recursively = (list) => {
    const length = list.length;
    for (let i = 0; i < (length / 6); i++) {
      const stepList = list.slice(i * 6, (i * 6) + 6);
        for (let j = 0; j < 6; j++) {
            const duplicatedItem = stepList.find((item, ind) => {
                return item.name === stepList[j].name && (ind !== j);
            });
            if (duplicatedItem !== undefined) {
                const ind = (i * 6) + j;
                const getNumberOfEight = Math.trunc(ind / 8);
                const elemToMove = list.splice(ind, 1)[0];
                list.splice(getNumberOfEight * 8, 0, elemToMove);
                sort6recursively(list);
            }
        }
    }
    return list;
  }
  
fullPetsList = (() => {
    let tempArr = [];
    for (let i = 0; i < 6; i++) {
      const newPets = pets;
      for (let j = pets.length; j > 0; j--) {
        let randInd = Math.floor(Math.random() * j);
        const randElem = newPets.splice(randInd, 1)[0];
        newPets.push(randElem);
      }
      tempArr = [...tempArr, ...newPets];
    }
    return tempArr;
  })();

fullPetsList = sort863(fullPetsList);

const createPetsPages = (list) => {
  length = list.length;
  let tempArr = [];
  for (let i = 0; i < length / numOfCards; i++){
    tempArr[i] = list.slice(i * numOfCards, i * numOfCards + numOfCards);
  };
  return (tempArr);
 };

let pageCounter = 1;
let petsPages = [];
let prevButton = document.querySelector("#prev__page"); 
let nextButton = document.querySelector("#next__page");
let currentPage = document.querySelector("#curr__page");
let firstPageButton = document.querySelector("#first__page"); 
let lastPageButton = document.querySelector("#last__page"); 

function previousPage (counter)  {
  // console.log(counter, petsPages)
    if (counter > 2) {
        counter -= 1;
        currentPage.textContent = counter;
        nextButton.disabled = false;
        nextButton.classList.remove('nav__disabled');
        nextButton.classList.add('nav__active');
        lastPageButton.disabled = false;
        lastPageButton.classList.remove('nav__disabled');
        lastPageButton.classList.add('nav__active');
        createPets(petsPages[counter - 1]);
      } else if (counter === 2) {
        counter -= 1;
        currentPage.textContent = counter;
        prevButton.disabled = true;
        firstPageButton.disabled = true;
        prevButton.classList.remove('nav__active');
        prevButton.classList.add('nav__disabled');
        firstPageButton.classList.remove('nav__active');
        firstPageButton.classList.add('nav__disabled');
        createPets(petsPages[counter - 1]);
      }
    }

if (document.documentElement.clientWidth >= 1200) {
  numOfCards = 8;
  petsPages = createPetsPages(fullPetsList);
  createPets(petsPages[0]);
    document.querySelector("#prev__page").addEventListener('click', () => {
    if (pageCounter > 2) {
        pageCounter -= 1;
        currentPage.textContent = pageCounter;
        nextButton.disabled = false;
        nextButton.classList.remove('nav__disabled');
        nextButton.classList.add('nav__active');
        lastPageButton.disabled = false;
        lastPageButton.classList.remove('nav__disabled');
        lastPageButton.classList.add('nav__active');
        createPets(petsPages[pageCounter - 1]);
      } else if (pageCounter === 2) {
        pageCounter -= 1;
        currentPage.textContent = pageCounter;
        prevButton.disabled = true;
        firstPageButton.disabled = true;
        prevButton.classList.remove('nav__active');
        prevButton.classList.add('nav__disabled');
        firstPageButton.classList.remove('nav__active');
        firstPageButton.classList.add('nav__disabled');
        createPets(petsPages[pageCounter - 1]);
      }
    })

  document.querySelector("#next__page").addEventListener('click', () => {
      if (pageCounter < 5) {
        pageCounter += 1;
        currentPage.textContent = pageCounter;
        prevButton.disabled = false;
        firstPageButton.disabled = false;
        prevButton.classList.remove('nav__disabled');
        prevButton.classList.add('nav__active');
        firstPageButton.classList.remove('nav__disabled');
        firstPageButton.classList.add('nav__active');
        createPets(petsPages[pageCounter - 1]);
      } else if (pageCounter === 5) {
        pageCounter += 1;
        currentPage.textContent = pageCounter;
        nextButton.disabled = true;
        lastPageButton.disabled = true;
        nextButton.classList.remove('nav__active');
        nextButton.classList.add('nav__disabled');
        lastPageButton.classList.remove('nav__active');
        lastPageButton.classList.add('nav__disabled');
        createPets(petsPages[pageCounter - 1]);
      }
    })
  
    document.querySelector("#first__page").addEventListener('click', () => {
      pageCounter = 1;
      currentPage.textContent = pageCounter;
      prevButton.disabled = true;
      firstPageButton.disabled = true;
      prevButton.classList.remove('nav__active');
      prevButton.classList.add('nav__disabled');
      firstPageButton.classList.remove('nav__active');
      firstPageButton.classList.add('nav__disabled');
      lastPageButton.disabled = false;
      nextButton.disabled = false;
      nextButton.classList.remove('nav__disabled');
      nextButton.classList.add('nav__active');
      lastPageButton.classList.remove('nav__disabled');
      lastPageButton.classList.add('nav__active');
      createPets(petsPages[pageCounter - 1]);
    })
  
    document.querySelector("#last__page").addEventListener('click', () => {
      pageCounter = 6;
      currentPage.textContent = pageCounter;
      prevButton.disabled = false;
      firstPageButton.disabled = false;
      prevButton.classList.remove('nav__disabled');
      prevButton.classList.add('nav__active');
      firstPageButton.classList.remove('nav__disabled');
      firstPageButton.classList.add('nav__active');
      nextButton.disabled = true;
      lastPageButton.disabled = true;
      nextButton.classList.remove('nav__active');
      nextButton.classList.add('nav__disabled');
      lastPageButton.classList.remove('nav__active');
      lastPageButton.classList.add('nav__disabled');
      createPets(petsPages[pageCounter - 1]);
    })
} else if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1200){
  numOfCards = 6;
  let petsPages = createPetsPages(fullPetsList);
  createPets(petsPages[0]);
  document.querySelector("#prev__page").addEventListener('click', () => {
    if (pageCounter > 2) {
      pageCounter -= 1;
      currentPage.textContent = pageCounter;
      nextButton.disabled = false;
      nextButton.classList.remove('nav__disabled');
      nextButton.classList.add('nav__active');
      lastPageButton.disabled = false;
      lastPageButton.classList.remove('nav__disabled');
      lastPageButton.classList.add('nav__active');
      createPets(petsPages[pageCounter - 1]);
    } else if (pageCounter > 1) {
      pageCounter -= 1;
      currentPage.textContent = pageCounter;
      prevButton.disabled = true;
      firstPageButton.disabled = true;
      prevButton.classList.remove('nav__active');
      prevButton.classList.add('nav__disabled');
      firstPageButton.classList.remove('nav__active');
      firstPageButton.classList.add('nav__disabled');
      createPets(petsPages[pageCounter - 1]);
    }
    })
    
    document.querySelector("#next__page").addEventListener('click', () => {
      if (pageCounter < 7) {
        pageCounter += 1;
        currentPage.textContent = pageCounter;
        prevButton.disabled = false;
        firstPageButton.disabled = false;
        prevButton.classList.remove('nav__disabled');
        prevButton.classList.add('nav__active');
        firstPageButton.classList.remove('nav__disabled');
        firstPageButton.classList.add('nav__active');
        createPets(petsPages[pageCounter - 1]);
      } else if (pageCounter === 7) {
        pageCounter += 1;
        currentPage.textContent = pageCounter;
        nextButton.disabled = true;
        lastPageButton.disabled = true;
        nextButton.classList.remove('nav__active');
        nextButton.classList.add('nav__disabled');
        lastPageButton.classList.remove('nav__active');
        lastPageButton.classList.add('nav__disabled');
        createPets(petsPages[pageCounter - 1]);
      }
    })
  
    document.querySelector("#first__page").addEventListener('click', () => {
      pageCounter = 1;
      currentPage.textContent = pageCounter;
      prevButton.disabled = true;
      firstPageButton.disabled = true;
      prevButton.classList.remove('nav__active');
      prevButton.classList.add('nav__disabled');
      firstPageButton.classList.remove('nav__active');
      firstPageButton.classList.add('nav__disabled');
      lastPageButton.disabled = false;
      nextButton.disabled = false;
      nextButton.classList.remove('nav__disabled');
      nextButton.classList.add('nav__active');
      lastPageButton.classList.remove('nav__disabled');
      lastPageButton.classList.add('nav__active');
      createPets(petsPages[pageCounter - 1]);
    })
  
    document.querySelector("#last__page").addEventListener('click', () => {
      pageCounter = 8;
      currentPage.textContent = pageCounter;
      prevButton.disabled = false;
      firstPageButton.disabled = false;
      prevButton.classList.remove('nav__disabled');
      prevButton.classList.add('nav__active');
      firstPageButton.classList.remove('nav__disabled');
      firstPageButton.classList.add('nav__active');
      nextButton.disabled = true;
      lastPageButton.disabled = true;
      nextButton.classList.remove('nav__active');
      nextButton.classList.add('nav__disabled');
      lastPageButton.classList.remove('nav__active');
      lastPageButton.classList.add('nav__disabled');
      createPets(petsPages[pageCounter - 1]);
    })

} else {
  numOfCards = 3;
  let petsPages = createPetsPages(fullPetsList);
  createPets(petsPages[0]);
  document.querySelector("#prev__page").addEventListener('click', () => {
    if (pageCounter > 2) {
      pageCounter -= 1;
      currentPage.textContent = pageCounter;
      nextButton.disabled = false;
      nextButton.classList.remove('nav__disabled');
      nextButton.classList.add('nav__active');
      lastPageButton.disabled = false;
      lastPageButton.classList.remove('nav__disabled');
      lastPageButton.classList.add('nav__active');
      createPets(petsPages[pageCounter - 1]);
    } else if (pageCounter > 1) {
      pageCounter -= 1;
      currentPage.textContent = pageCounter;
      prevButton.disabled = true;
      firstPageButton.disabled = true;
      prevButton.classList.remove('nav__active');
      prevButton.classList.add('nav__disabled');
      firstPageButton.classList.remove('nav__active');
      firstPageButton.classList.add('nav__disabled');
      createPets(petsPages[pageCounter - 1]);
    }
    })
    
    document.querySelector("#next__page").addEventListener('click', () => {
      if (pageCounter < 15) {
        pageCounter += 1;
        currentPage.textContent = pageCounter;
        prevButton.disabled = false;
        firstPageButton.disabled = false;
        prevButton.classList.remove('nav__disabled');
        prevButton.classList.add('nav__active');
        firstPageButton.classList.remove('nav__disabled');
        firstPageButton.classList.add('nav__active');
        createPets(petsPages[pageCounter - 1]);
      } else if (pageCounter === 15) {
        pageCounter += 1;
        currentPage.textContent = pageCounter;
        nextButton.disabled = true;
        lastPageButton.disabled = true;
        nextButton.classList.remove('nav__active');
        nextButton.classList.add('nav__disabled');
        lastPageButton.classList.remove('nav__active');
        lastPageButton.classList.add('nav__disabled');
        createPets(petsPages[pageCounter - 1]);
      }
    })
  
    document.querySelector("#first__page").addEventListener('click', () => {
      pageCounter = 1;
      currentPage.textContent = pageCounter;
      prevButton.disabled = true;
      firstPageButton.disabled = true;
      prevButton.classList.remove('nav__active');
      prevButton.classList.add('nav__disabled');
      firstPageButton.classList.remove('nav__active');
      firstPageButton.classList.add('nav__disabled');
      lastPageButton.disabled = false;
      nextButton.disabled = false;
      nextButton.classList.remove('nav__disabled');
      nextButton.classList.add('nav__active');
      lastPageButton.classList.remove('nav__disabled');
      lastPageButton.classList.add('nav__active');
      createPets(petsPages[pageCounter - 1]);
    })
  
    document.querySelector("#last__page").addEventListener('click', () => {
      pageCounter = 16;
      currentPage.textContent = pageCounter;
      prevButton.disabled = false;
      firstPageButton.disabled = false;
      prevButton.classList.remove('nav__disabled');
      prevButton.classList.add('nav__active');
      firstPageButton.classList.remove('nav__disabled');
      firstPageButton.classList.add('nav__active');
      nextButton.disabled = true;
      lastPageButton.disabled = true;
      nextButton.classList.remove('nav__active');
      nextButton.classList.add('nav__disabled');
      lastPageButton.classList.remove('nav__active');
      lastPageButton.classList.add('nav__disabled');
      createPets(petsPages[pageCounter - 1]);
    })
};


const createPopup = (card, list) => {
  let name = card.querySelector('.pet__card__title').textContent;
  const pet = list.filter((item) => {
    if (item.name === name) return item;
  });
  let str = `<div class="popup__close" id="popup__close">
  <img src="../../assets/icons/x.svg" alt="close">
</div>
<div class="popup__container">
  <img class="popup__img" src="${pet[0].img}" alt="${pet[0].name}">
</div>
<div class="popup__row">
  <div class="popup__head">
    <div class="popup__title">${pet[0].name}</div>
    <div class="popup__sub">${pet[0].type} - ${pet[0].breed}</div>
  </div>
  <p class="popup__text">${pet[0].description}</p>
     <ul class="popup__info">
      <li class="popup__item"><span><b>Age:</b>${pet[0].age}</span></li>
      <li class="popup__item"><span><b>Inoculations:</b>${pet[0].inoculations}</span></li>
      <li class="popup__item"><span><b>Diseases:</b>${pet[0].diseases}</span></li>
      <li class="popup__item"><span><b>Parasites:</b>${pet[0].parasites}</span></li>
    </ul></div>`;
  return str;
};

let popup = document.getElementById("popup");
let popup__close = document.getElementsByClassName("popup__close")[0];

let shadow = document.getElementsByClassName("shadow")[0];
let cardsListContainer = document.querySelector("#cards");

cardsListContainer.addEventListener('click', (event) => {
  const card = event.target.closest('.pet__card');
  if (card !== null) {
    shadow.style.display = "block";
    popup.innerHTML = '';
    popup.innerHTML += createPopup(card, pets);
    popup.style.display = "flex";
    popupCloseHandler();
  }
  
});

const popupCloseHandler = () => {
  document.querySelector(".popup__close").addEventListener("click", () => {
    popup.style.display = "none";
    shadow.style.display = "none";
});
} 

let navButton = document.querySelector(".nav__btn");
let headerLogo = document.querySelector(".logo");
let mobileMenu = document.querySelector(".menu-list");

shadow.onclick = function () {
  popup.style.display = "none";
  shadow.style.display = "none";
  mobileMenu.classList.remove('menu-list_active');
  headerLogo.classList.remove('logo__mobile__active');
  navButton.classList.remove('nav__btn__active');
  document.querySelector(".header").classList.remove('header_mobile');
  document.querySelector(".logo-title").classList.remove('logo-title__mobile-menu');
  document.querySelector(".logo-subtitle").classList.remove('logo-subtitle__mobile-menu');
  document.querySelector(".menu").style.display = "none";
}

navButton.onclick = () => {
  if (navButton.classList.contains('nav__btn__active')) {
    navButton.classList.remove('nav__btn__active');
    shadow.style.display = "none";
    mobileMenu.classList.remove('menu-list_active');
    headerLogo.classList.remove('logo__mobile__active');
    document.querySelector(".header").classList.remove('header_mobile');
    document.querySelector(".logo-title").classList.remove('logo-title__mobile-menu');
    document.querySelector(".logo-subtitle").classList.remove('logo-subtitle__mobile-menu');
    document.querySelector(".menu").style.display = "none";
  } else {
    navButton.classList.add('nav__btn__active');
    document.querySelector(".menu").style.display = "flex";
    shadow.style.display = "flex";
    headerLogo.classList.add('logo__mobile__active');
    document.querySelector(".logo-title").classList.add('logo-title__mobile-menu');
    document.querySelector(".logo-subtitle").classList.add('logo-subtitle__mobile-menu');
    document.querySelector(".header").classList.add('header_mobile');
    mobileMenu.classList.add('menu-list_active');
  } 
}



