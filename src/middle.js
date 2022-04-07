const Middle = () => {
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

                        for (let i = 0; i < url.length - 1; i++) {
                            let h3Id = document.getElementById('headH3');
                            h3Id.style.display = "block";

                            allUrls = url[i].html_url;

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
                    <a href=${data.html_url}><img src=${data.avatar_url}></a>
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
                console.log(data);
            });
    }

    return ( // In this return section jsx file will be there
        <div id="middle">

            <div id="inputDiv">
                <form id="info">
                    <input type="text" id="user" placeholder='Username'></input>
                    <input type="button" value="Searching" onClick={handleClick}></input>
                </form>
            </div>

            <div id="outputDiv">
            </div>

            <div id="repoDiv">
            <h3 id="headH3">List Of Repo</h3>
                <div id="repo">

                </div>
            </div>

        </div>

    );
}

export default Middle;