import Footer from './footer';
const Middle = () => {

    const showProfile = () => {
        let profileId = document.getElementById('profile');
        profileId.innerHTML = `
        <h1> Rishabh </h1>
        `;
    }

    const handleClick = () => {

        let userName = document.getElementById('user').value;

        let reqName = userName.split(' ').join('');

        // console.log(reqName);

        let ans = "https://api.github.com/users/" + reqName;

        fetch(ans).then((data) => data.json())
            .then((data) => {
                let outputId = document.getElementById('outputDiv');

                let allUrls = "";

                fetch(data.repos_url)
                    .then((urls) => urls.json())
                    .then((url) => {
                        // console.log(typeof(url));
                        for (let i = 0; i < url.length - 1; i++) {
                            //    console.log(url[i].html_url);
                            allUrls = url[i].html_url;
                            console.log(allUrls);

                            let repoId = document.getElementById('repo');
                            let repoData = repoId.innerHTML;
                            if(repoData!='')
                                repoData += allUrls;
                            repoId.innerHTML = `
                                <p>${repoData}</p>
                            `
                        }
                    })

                outputId.innerHTML = `
            <div class="profile">

                <div>
                    <img src=${data.avatar_url}>
                </div>

                <div>
                    <h2>${data.name}</h2>
                </div>

                <div>
                    <p> Followers :  ${data.followers}</p>
                </div>

                <div>
                   <p> Following :  ${data.following}</p>
                </div>


            </div>
            `;
                // console.log(data);
            });
    }

    return ( // In this return section jsx file will be there
        <div id="middle">

            <div id="inputDiv">
                <form id="info">
                    <input type="text" id="user" placeholder='username'></input>
                    <input type="button" value="Searching" onClick={handleClick}></input>
                </form>
            </div>

            <div id="outputDiv">

            </div>

            <div id="repoDiv">
                <h3>List Of Repo</h3>
                <div id="repo">

                </div>
            </div>

        </div>

    );
}

export default Middle;