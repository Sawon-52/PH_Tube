const handleData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const mainData = data.data;
    // console.log(mainData);
    
    // get category container for puting category
    const cateContainer = document.getElementById('category_container');

    // access api data using for each loop
    mainData.forEach((category) => {
        // console.log(category);
        const div = document.createElement('div');
        div.innerHTML =`
            <button onclick="handleContent('${category.category_id}')" class="text-xl font-medium text-gray-500 p-3 px-5 text-center  bg-gray-300 rounded-md w-32">${category.category}</button>
        `;

        cateContainer.appendChild(div);
    });

};

const handleContent = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    mainData = data.data;

    // if there no content than show it
    if(mainData.length === 0){
        const noItems = document.getElementById('error-items');
        noItems.classList.remove('hidden');

        const cardContainer = document.getElementById('card_container');
        cardContainer.innerHTML= '';
    }
    else{
        const noItems = document.getElementById('error-items');
        noItems.classList.add('hidden');
        setContent(mainData);
    }

    // setContent(mainData);
};

// Compare function
function cp(a, b) {
    const valueA = parseInt(a.others.views);
    const valueB = parseInt(b.others.views);
  
    const numericA = a.others.views.includes('K') ? valueA * 1000 : valueA;
    const numericB = b.others.views.includes('K') ? valueB * 1000 : valueB;
    return numericB - numericA;
}


const sortByView = async () => {
    // console.log("Main data:" , mainData);
    mainData = mainData.sort(cp);
    setContent(mainData);
};


// create time second to hrs min 
const formatDuration = (duration) => {
    const hours = Math.round(duration / 3600);
    const minutes = Math.round((duration % 3600) / 60);
    return `${hours} hrs ${minutes} min ago`;
};


// create card component
const setContent = (mainData) => {
    // console.log(mainData.title);
    // get card_container for puting content
    const cardContainer = document.getElementById('card_container');
    cardContainer.innerHTML= ' ';

    // getting content using forEach loop
    mainData.forEach((content) => {
        // get time form api and call formatDuration function
        const result= content.others.posted_date ? `<h2 class="absolute bottom-5 right-5 text-white text-xs font-normal py-2 px-3 bg-black rounded-xl">${formatDuration(content.others.posted_date)}</h2>` : "" ;


        // console.log(timeInSecnd)
        const div = document.createElement('div');
        div.innerHTML=`
                <div class="card w-72">
                <div class="relative">
                    <figure><img src=${content.thumbnail} class="rounded-2xl h-40 w-full object-cover"/></figure>
                    ${result}
                </div>
                <div class="mt-5">
                    <div class="flex gap-5 items-start">
                        <div class="avatar">
                            <div class="w-14 rounded-full">
                            <img src=${content.authors[0].profile_picture}/>
                            </div>
                        </div>

                        <div>
                            <h2 class="text-sm text-[#171717] font-bold">${content.title}</h2>
                            <div id=certified class="flex items-center gap-3">
                                <h2 class="text-sm text-gray-400 font-normal my-3">${content.authors[0].profile_name}</h2>
                                <h2>${content.authors[0].verified ? '<img src="image/bluetick.png" alt="blue tick" class="w-5 h-5"></img>':''}
                            </div>
                            <h2 class="text-sm text-gray-400 font-normal">${content.others.views} views</h2>
                        </div>
                    </div>
                </div>
            </div>
        `

        cardContainer.appendChild(div);
    });
}



//Autometic Show category items
handleData();
// bydefult show all data
handleContent('1000');


function blogPage(){
    // Navigate to the new page
    window.location.href ='blog.html';
}

function mainPage(){
    // Navigate to the new page
    window.location.href ='index.html';
}
