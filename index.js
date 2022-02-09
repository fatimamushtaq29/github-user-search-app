const form = document.querySelector('form');
const noResult = document.querySelector('form p');
const input = document.querySelector('input');
const mainSection = document.querySelector('section');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    getUserInfo();
})

input.addEventListener('input', function (e) {
    noResult.classList.remove('no-result');
    input.classList.remove('input-padding-for-no-result');

})

const getUserInfo = async () => {
    try {
        const searchTerm = form.elements.username.value.trim();
        const config = {headers: {Accept: 'application/vnd.github.v3+json'}};
        const res = await axios.get(`https://api.github.com/users/${searchTerm}`, config);
        const data = res.data;
        mainSection.classList.add('show-main-section');
        const userImage = document.querySelector('.user-image');
        userImage.src = data.avatar_url;
        
        const update = (selector, value) => {
            const addInnerText = text => {
                document.querySelector(`${selector}`).innerText = text;
            }
            const isSelectorInformationElement = selector => {
                return selector === '.location p' || selector === '.blog p' || selector === '.twitter p' || selector === '.company p';
            }
            const addNotAvailableClass = () => {
                document.querySelector(`${selector}`).classList.add('not-available');
                if (isSelectorInformationElement(selector)) {
                    document.querySelector(`${selector}`).parentElement.firstElementChild.classList.add('not-available');
                }
            }
            const removeNotAvailableClass = () => {
                document.querySelector(`${selector}`).classList.remove('not-available');
                if (isSelectorInformationElement(selector)) {
                    document.querySelector(`${selector}`).parentElement.firstElementChild.classList.remove('not-available');
                }
            }
            if (value === null || value === '') {           
                addNotAvailableClass();     
                if (selector === '.name' || selector === '.bio') {
                    addInnerText(`${selector.charAt(1).toUpperCase() + selector.slice(2)} Not Available`);
                    return;
                } 
                addInnerText('Not Available');
                return;
            }  
            removeNotAvailableClass();
            addInnerText(value);
        }
        update('.name', data.name);
        update('.username a', `@${data.login}`)
        document.querySelector('.username a').setAttribute('href', data.html_url);
        update('.join-date', `Joined ${new Date(data.created_at).toLocaleString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})}`)
        update('.bio', data.bio);
        update('.repos .figure', data.public_repos);
        update('.followers .figure', data.followers);
        update('.following .figure', data.following);
        update('.location p', data.location);
        update('.blog p', data.blog);
        if (data.blog !== null && data.blog !== '') {
            const blog = document.querySelector('.blog p');
            blog.style.cursor = 'pointer';
            blog.onclick = function becomeClickable() {
                if (!/^https?:\/\//i.test(data.blog)) {
                    window.location.href = `https://${data.blog}`;
                    return;
                } 
                window.location.href = data.blog;
            }
        }
        update('.twitter p', data.twitter_username);
        update('.company p', data.company);

    }
    catch (e) {
        noResult.classList.add('no-result');
        input.classList.add('input-padding-for-no-result');
        mainSection.classList.remove('show-main-section');
        console.log('No matching result', e);
    }
}