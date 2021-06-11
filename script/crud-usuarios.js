let usersList = [
  {
    name: "Hector",
    lastName: "Muñoz Morales",
    email: "hector.munoz@cecytlax.edu.mx",
    id: 0,
  },
  {
    name: "Daniel",
    lastName: "Meza Miranda",
    email: "daniel.academlo@gmail.com",
    id: 1,
  },
  {
    name: "Juan",
    lastName: "Martínez",
    email: "correo@correo.com",
    id: 2,
  },
  {
    name: "Samantha",
    lastName: "López",
    email: "samantha@correo.com",
    id: 3,
  },
];

const d = document,
  w = window,
  $mainTable = d.querySelector(".table"),
  $form = d.querySelector(".editor-form"),
  $editorTitle = d.querySelector(".editor-title h2"),
  $editorBtn = d.querySelector("#add-btn");
($template = d.querySelector("template").content),
  ($fragment = d.createDocumentFragment());

/* w.localStorage.setItem("usersList", JSON.stringify(usersList)); */
let localUsers = JSON.parse(w.localStorage.getItem("usersList"));

//Read-GET
const readUsers = () => {
  localUsers.forEach((user) => {
    $template.querySelector(
      ".complete-name"
    ).textContent = `${user.name} ${user.lastName}`;
    $template.querySelector(".email").textContent = user.email;
    let index = localUsers.map((el) => el.name).indexOf(user.name);
    $template.querySelector(".edit-btn i").dataset.id = index;
    $template.querySelector(".edit-btn i").dataset.name = user.name;
    $template.querySelector(".edit-btn i").dataset.lastName = user.lastName;
    $template.querySelector(".edit-btn i").dataset.email = user.email;
    $template.querySelector(".delete-btn i").dataset.id = index;

    let $clone = $template.cloneNode(true);
    $fragment.appendChild($clone);
  });

  $mainTable.appendChild($fragment);
};

d.addEventListener("DOMContentLoaded", readUsers);

d.addEventListener("submit", (e) => {
  if (e.target === $form) {
    e.preventDefault();

    let $inputName = d.getElementById("input-name").value,
      $inputLastName = d.getElementById("input-last-name").value,
      $inputEmail = d.getElementById("input-email").value;

    //Create-POST
    if ($editorTitle.textContent === "Nuevo Usuario") {
      $template.querySelector(
        ".complete-name"
      ).textContent = `${$inputName} ${$inputLastName}`;
      $template.querySelector(".email").textContent = $inputEmail;
      let index = 0;
      for (const key in localUsers) {
        index = Number(key) + 1;
      }
      console.log(index);
      $template.querySelector(".edit-btn i").dataset.id = index;
      $template.querySelector(".edit-btn i").dataset.name = $inputName;
      $template.querySelector(".edit-btn i").dataset.lastName = $inputLastName;
      $template.querySelector(".edit-btn i").dataset.email = $inputEmail;
      $template.querySelector(".delete-btn i").dataset.id = index;

      let $clone = $template.cloneNode(true);
      $fragment.appendChild($clone);

      localUsers.push({
        name: $inputName,
        lastName: $inputLastName,
        email: $inputEmail,
        id: index,
      });
    } else {
      //Update-PUT
      localUsers.forEach((user) => {
        if (user.id == e.target.inputId.value) {
          user.name = $inputName;
          user.lastName = $inputLastName;
          user.email = $inputEmail;
        }
      });
    }
    w.localStorage.setItem("usersList", JSON.stringify(localUsers));
    location.reload();
  }

  $mainTable.appendChild($fragment);
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-btn i")) {
    console.log(e.target);
    $editorTitle.textContent = "Modificar Usuario";
    $editorTitle.style.background = "#8ee16a";
    $editorBtn.value = "Editar usuario";
    $form.name.value = e.target.dataset.name;
    $form.lastName.value = e.target.dataset.lastName;
    $form.email.value = e.target.dataset.email;
    $form.inputId.value = e.target.dataset.id;
  }

  if (e.target.matches(".delete-btn i")) {
    //Delete-DELETE
    localUsers.forEach((user) => {
      if (user.id == e.target.dataset.id) {
        localUsers.splice(user.id, 1);
      }
    });
    w.localStorage.setItem("usersList", JSON.stringify(localUsers));
    location.reload();
  }
});
