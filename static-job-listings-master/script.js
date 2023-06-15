const dataList = document.getElementById("jobs");
const bar = document.getElementById("bar");
const filterBar = document.getElementById("bar-filters");

// Fetch JSON data
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Call a function to process the retrieved data
    displayData(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Display data in HTML
function displayData(data) {
  // Iterate through the data and create list items
  renderJobs(data);

  // Filter data on click
  const buttons = document.querySelectorAll(".filters button");
  // Create filters array to store all clicked filters
  let filters = [];
  const dataIds = data.map((item) => item.id);
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonText = button.textContent;
      // Check if buttonText is already present in filters array
      const isFilterPresent = filters.includes(buttonText);

      if (!isFilterPresent) {
        // Add buttonText to filters array
        filters.push(buttonText);
      }

      // Filter data
      newData = filterData(data, filters);
      const ids = newData.map((item) => item.id);

      // Hide not filtered data
      dataIds.forEach((id) => {
        const element = document.querySelector(`[job-id="${id}"]`);
        const jobId = element.getAttribute("job-id");
        if (!ids.includes(Number(jobId))) {
          element.classList.add("hide");
        }
      });
      renderFilterBar(filters);
    });
  });

  // Remove filter
  const barFilters = document.getElementById("bar-filters");
  barFilters.addEventListener("click", (e) => {
    const rmFilter = e.target.closest("div").textContent;
    var index = filters.indexOf(rmFilter);
    // Delete filter from array
    if (index !== -1) {
      filters.splice(index, 1);
    }
    newData = filterData(data, filters);
    const ids = newData.map((item) => item.id);
    dataIds.forEach((id) => {
      const element = document.querySelector(`[job-id="${id}"]`);
      const jobId = element.getAttribute("job-id");
      if (ids.includes(Number(jobId))) {
        element.classList.remove("hide");
      }
    });
    if (filters.length === 0) {
      location.reload();
    }
    else {
      renderFilterBar(filters);
    }
  });

  // Reset all filters
  const reset = document.getElementById("reset");
  reset.addEventListener("click", () => {
    location.reload();
  });
}

// Filter
function filterData(data, filters) {
  const filteredData = data.filter((item) => {
    return filters.every((filter) => {
      return (
        item.role === filter ||
        item.level === filter ||
        item.languages.includes(filter) ||
        item.tools.includes(filter)
      );
    });
  });
  return filteredData;
}

// Render all jobs
function renderJobs(data) {
  dataList.innerHTML = data
    .map((item) => {
      return renderJobCard(item);
    })
    .join("");
}

// Render job
function renderJobCard(item) {
  const selectedJob = [item.role, item.level, ...item.languages, ...item.tools];
  job = `
  <div class="job ${item.featured ? 'active' : ''}" job-id="${item.id}">
    <div class="info">
      <div class="main-info">
        <img src="${item.logo}" alt="logo">
        <div class="titles">
          <div class="company">
            <span>${item.company}</span>
            ${
              item.new && item.featured
                ? "<div><span>new!</span><span>featured</span></div>"
                : item.new
                ? "<div><span>new!</span></div>"
                : ""
            }
          </div>
          <h3>${item.position}</h3>
          <ul>
            <li>${item.postedAt} &#x2022;</li>
            <li>${item.contract} &#x2022;</li>
            <li>${item.location}</li>
          </ul>
        </div>
      </div>
      <div class="filters">
        <hr>
        ${selectedJob.map((job) => `<button>${job}</button>`).join("")}
      </div>
    </div>
  </div>
  `;
  return job;
}

// Render search bar
function renderFilterBar(filters) {
  filterBar.innerHTML = "";
  bar.style.display = "flex";
  filters.forEach((filter) => {
    const barFilter = document.createElement("div");

    const text = document.createElement("span");
    text.textContent = filter;
    barFilter.appendChild(text);

    const buttonElement = document.createElement("button");
    const imageElement = document.createElement("img");
    imageElement.src = "../images/icon-remove.svg";
    imageElement.alt = "remove";
    buttonElement.appendChild(imageElement);
    barFilter.appendChild(buttonElement);

    filterBar.appendChild(barFilter);
  });
}
