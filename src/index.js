document.addEventListener("DOMContentLoaded", () => {
  initialise();
});

function initialise() {
  fetch("http://localhost:3000/dogs")
    .then((res) => res.json())
    .then((data) => buildTable(data));
}

function buildTable(data) {
  console.log(data);
  const table = document.querySelector("#table-body");
  const editName = document.getElementsByName("name")[0];
  const editBreed = document.getElementsByName("breed")[0];
  const editSex = document.getElementsByName("sex")[0];
  const submitBtn = document.querySelectorAll("input")[3];

  for (let i = 0; i < data.length; i++) {
    let row = document.createElement("tr");

    let tdName = document.createElement("td");
    tdName.textContent = data[i].name;

    let tdBreed = document.createElement("td");
    tdBreed.textContent = data[i].breed;

    let tdSex = document.createElement("td");
    tdSex.textContent = data[i].sex;

    let tdButton = document.createElement("td");
    let btn = document.createElement("button");
    btn.textContent = "Edit";
    btn.addEventListener("click", () => {
      editName.value = data[i].name;
      editBreed.value = data[i].breed;
      editSex.value = data[i].sex;
      //submitBtn.removeEventListener();
      submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        updateExistingDog(data[i].id);
      });
    });

    tdButton.appendChild(btn);

    row.appendChild(tdName);
    row.appendChild(tdBreed);
    row.appendChild(tdSex);
    row.appendChild(tdButton);

    table.appendChild(row);
  }
}

function updateExistingDog(id) {
  const editName = document.getElementsByName("name")[0].value;
  const editBreed = document.getElementsByName("breed")[0].value;
  const editSex = document.getElementsByName("sex")[0].value;
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: editName, breed: editBreed, sex: editSex }),
  });
}
