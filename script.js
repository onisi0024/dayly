fetch("data.json")
  .then(response => response.json())
  .then(data => {

    // 日付順（新しい順）
    data.sort((a, b) => {
      const dateA = a.date.replace(/\//g, "-");
      const dateB = b.date.replace(/\//g, "-");

      return new Date(dateB) - new Date(dateA);
    });

    const list = document.getElementById("diary-list");
    const searchBox = document.getElementById("search-box");
    const resultCount = document.getElementById("result-count");

    function displayArticles(keyword = "") {

      list.innerHTML = "";

      let displayItems;

      if (keyword.trim() === "") {

        // 通常表示（最新10件）
        displayItems = data.slice(0, 10);

        resultCount.textContent =
          `最新の記事を10件表示しています（全${data.length}件）`;

        resultCount.style.color = "black";

      } else {

        // 検索
        displayItems = data.filter(item =>
          item.title.toLowerCase().includes(keyword.toLowerCase())
        );

        resultCount.textContent =
          `検索結果：${displayItems.length}件`;

        resultCount.style.color = "black";

      }

      if (displayItems.length === 0) {

        resultCount.textContent = "検索結果：0件";
        resultCount.style.color = "red";
        resultCount.style.fontWeight = "bold";

        const li = document.createElement("li");
        li.textContent = "記事が見つかりませんでした。";
        li.style.color = "red";
        li.style.fontWeight = "bold";

        list.appendChild(li);

        return;
      }

      displayItems.forEach(item => {

        const li = document.createElement("li");

        li.innerHTML = `
          <a href="${item.file}">
            ${item.date} - ${item.title}
          </a>
        `;

        list.appendChild(li);

      });

    }

    // 初期表示
    displayArticles();

    // 検索イベント
    searchBox.addEventListener("input", () => {
      displayArticles(searchBox.value);
    });

  })
  .catch(error => {
    console.error("読み込みエラー:", error);
  });
