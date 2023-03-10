# Frontend Mentor - Multi-step form solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Links

- Solution URL: [https://www.frontendmentor.io/solutions/multistep-form-gDGwQq15xb](https://www.frontendmentor.io/solutions/multistep-form-gDGwQq15xb)
- Live Site URL: [https://seranela.github.io/multi-step-form/](https://seranela.github.io/multi-step-form/)

## My process

### Built with

- HTML5
- CSS
- Flexbox
- CSS Grid
- JavaScript
- Mobile-first workflow

### What I learned

Originally, I was using predefined transition classes depending on the direction I wanted to slide in/out. It had a drawback where clicking back/next would cause the form sections container to grow/shrink vertically. This is because content in some sections was taller than others.

To solve this I decided to use a `display: flex` with row orientation so that the parent container would adjust to the largest section content. This creates a max content based fitted container that would not have the drawback of shrinking/growing as you click back/next.

...

After trying this new approach, I ran into a new issue where you could tab key into the other sections even though they weren't the current section. I ended up using JavaScript to check the current section and disable tabbing of non-current elements in other section by adding the attribute `tabindex="-1"` and then removing it as needed.

## Author

- Frontend Mentor - [@seranela](https://www.frontendmentor.io/profile/seranela)