<div align="center">

```bash
             ███╗░░██╗░██████╗░██╗░░██╗░░░░░░██████╗░███████╗██╗░░░██╗░██████╗  ░█████╗░██╗░░░░░██╗
             ████╗░██║██╔════╝░╚██╗██╔╝░░░░░░██╔══██╗██╔════╝██║░░░██║██╔════╝  ██╔══██╗██║░░░░░██║
             ██╔██╗██║██║░░██╗░░╚███╔╝░█████╗██║░░██║█████╗░░╚██╗░██╔╝╚█████╗░  ██║░░╚═╝██║░░░░░██║
             ██║╚████║██║░░╚██╗░██╔██╗░╚════╝██║░░██║██╔══╝░░░╚████╔╝░░╚═══██╗  ██║░░██╗██║░░░░░██║
             ██║░╚███║╚██████╔╝██╔╝╚██╗░░░░░░██████╔╝███████╗░░╚██╔╝░░██████╔╝  ╚█████╔╝███████╗██║
             ╚═╝░░╚══╝░╚═════╝░╚═╝░░╚═╝░░░░░░╚═════╝░╚══════╝░░░╚═╝░░░╚═════╝░  ░╚════╝░╚══════╝╚═╝
```

A CLI built to modernize, standardize and make it easier to create/update Angular projects.

</div>

<p align="center">

  <a href="https://github.com/ngx-devs/ngx-devs-cli/actions?query=workflow%3A%22CI%22">
    <img alt="Build" src="https://github.com/ngx-devs/ngx-devs-cli/workflows/CI/badge.svg">
  </a>

  <a href="https://www.npmjs.com/package/@ngx-devs/cli">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@ngx-devs/cli">
  </a>

  <a href="https://packagephobia.com/result?p=@ngx-devs/cli">
    <img alt="Install Size" src="https://packagephobia.com/badge?p=@ngx-devs/cli&">
  </a>

  <img alt="Top Language" src="https://img.shields.io/github/languages/top/ngx-devs/ngx-devs-cli?color=3498db">

  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/ngx-devs/ngx-devs-cli?color=3498db&label=latest commit">

   <a href="https://github.com/ngx-devs/ngx-devs-cli/blob/main/LICENSE">
      <img alt="License" src="https://img.shields.io/packagist/l/doctrine/orm.svg">
  </a>

</p>

<p align="center"> 
 <a href="#information_source-about">About</a> •
 <a href="#arrow_forward-installation">Installation</a> •
 <a href="#hammer_and_wrench-technologies">Technologies</a> •  
 <a href="#hammer_and_wrench-commands">Commands</a> •   
 <a href="#boy-author">Author</a> •
 <a href="#balance_scale-license">License</a>
</p>

## :information_source: About

<div align="center">

Command-line interface (CLI) built in Node.js allow you to automate repetitive tasks and make your life easier when working with Angular projects.

---

</div>

## :arrow_forward: **Installation**

```bash
#install
npm install @ngx-devs/cli -g

#run some command
ngxd g c sample
```

---

## :hammer_and_wrench: **Technologies**

<div align="center">

|                               :globe_with_meridians: CLI                               |
| :------------------------------------------------------------------------------------: |
|                    [Gluegun](https://www.npmjs.com/package/gluegun)                    |
| [@angular-devkit/schematics](https://www.npmjs.com/package/@angular-devkit/schematics) |
|                     [TypeScript](https://www.typescriptlang.org/)                      |

</div>

## :robot: Commands

```bash
# create a new project
ngxd new <project-name>
```

### Components

##### :hammer_and_wrench: **basic**

```bash
# create a new basic component
ngxd generate component basic <component-name>
# or
ngxd g c b <component-name>
```

##### :hammer_and_wrench: **widget**

```bash
# create a new widget component
ngxd generate component widget <component-name>
# or
ngxd g c w <component-name>
```

##### :hammer_and_wrench: **page**

```bash
# create a new page component
ngxd generate component page <component-name>
# or
ngxd g c p <component-name>
```

##### :hammer_and_wrench: **dialog**

```bash
# create a new dialog component
ngxd generate component dialog <component-name>
# or
ngxd g c d <component-name>
```

## :boy: **Author**

<div align="center">

<a href="https://github.com/gleisonkz">
 <img src="https://avatars1.githubusercontent.com/u/9919?s=200&v=4" width="100px;" alt="Profile Photo Gleison Almeida"/>
 <br/>
 <sub><b>Gleison de Almeida</b></sub>
</a>

Developed with ❤️ by Gleison Almeida <br/> 👋🏽 My Contacts:

[![Linkedin Badge](https://img.shields.io/badge/-Gleison-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/gleison-ribeiro-a65257119) [![Github Badge](https://img.shields.io/badge/-Gleison-000?style=flat-square&logo=Github&logoColor=white)](https://github.com/gleisonkz) [![Outlook Badge](https://img.shields.io/badge/-Gleison-0078d4?style=flat-square&logo=microsoft-outlook&logoColor=white)](mailto:gleisonsubzerokz@gmail.com)

</div>

---

## :balance_scale: **License**

<div align="center">

Copyright © 2021 [Gleison Almeida](https://github.com/gleisonkz).<br />
This project is licensed by [MIT](./LICENSE).

</div>
