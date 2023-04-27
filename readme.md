# hphilpotts - Portfolio Site        

## Description:     

This is version 2 of my portfolio site: a complete rebuild from the ground up, with only content from _v1_ reused for _v2_.     

It is a static site, built using **HTML**, **CSS**, and **JavaScript** with the **jQuery** library. It was written in **VSCode**, and manually tested using **Ngrok** and **Chrome DevTools**. It is hosted via **GitHub Pages**: the domain _hphilpotts.com_ forwards to this site.       

Its purpose is to showcase my work and skills as a developer as well as providing some insight into who I am and what I do, with the ultimate aim of helping me secure my first role in software development.        

## Build considerations:     

Where the first version of my portfolio was a simple site using multiple HTML pages linked by a nav bar, for this version I wanted to provide a more seamless experience, optimised for mobile, with navigation primarly achieved through scrolling rather than clicking links.     

Given the relative simplicity of a portfolio site, I decided to avoid the use of frameworks or large libraries and instead focus on using 'standard' frontend technologies and techniques.      

I order to achieve this, I have used a single `index.html` file, with four `full-page-screen` divs. These are scaled to device `vh`, and using `scroll-snap` they can act as separate pages.        

Within these four main sections content is presented simply, or within CSS carousels, or through using jQuery '`toggle()`', depending on the use case and amount of content.        

I have used a combination of pure CSS, vanilla JavaScript and jQuery in order to control and enhance user experience: again, this is depending on use case, but I also hope it showcases my range of skills.        

## Learns from this project:        

The most notable takeaway from this project was that - while useful in many cases - Google Chrome's DevTools Device Mode does not 100% replicate actual mobile device experience: most notably the browser bar and its impact on visible area. In order to get around this issue, I used Ngrok's tunnels to manually test my locally hosted site during development.        

![Side-by-side screenshots from Chrome DevTools and Ngrok showing differences between the two](/img/devicemode-ngrok.png)       
_Left: Chrome DevTools, screenshot from locally hosted site on desktop when set to iPhone SE in Device Mode. Right: screengrab from iPhone SE when the same locally hosted site was accessed via Ngrok tunnels. Note the impact of the browser bar on positioning and visible area!_        

My CSS knowledge was both refreshed and improved through building this site: in particular through the use of `scroll-snap`, `::-webkit-scrollbar` and `@media` queries as well as lots of `flex`. Using a carousel for the first (and then second) time was good fun too.  

On the JavaScript front, I firstly found using jQuery again to be a real joy and will absolutely keep using it in projects whenever I can. Getting lots of DOM manipulation and `addEventListener()` practice has been great, and using `getBoundingClientRect()` was intially challenging but really rewarding and helpful.        

`window.onresize` was really important for ensuring element position values update accordingly when the screen is resized: otherwise the scroll points end up misagligned.        

Lastly, using a throttler for scroll events (see `throttledScrollEvent`) was really important in ensuring performance is not negatively impacted by unneccessary rapid and repeated function calls upon the user scrolling.       

## Current issues / bugs:     
- Some inner slide body divs overlap/misalign within their container on small screens: potentially an issue with maximum image width?       
- Screen resizing still causes scaling/sizing/positioning issues.       
- Refreshing/renavigating to local links also sometimes causes issues on mobile.        

## Future improvements / additions / features to implement:       
- Additional Content section in 'About': currently contact details are in 'Hello' section at top. A second location will improve UX and ensure these details are easier to find.        
- 'About site' section detailing a brief overview of how the site has been built and hosted - possibly also in 'About', or in a footer.     

- Use of CSS `svh` or `dvh` instead of `vh` in order to optimise more cleanly for mobile: at present `.main-container` is limited to `80vh` and a larger margin at the bottom of `.content-container` is used in order to prevent the address bar from overlapping content on devices narrower than `500px`.       

- Better use of semantic HTML could be applied along with improved accessibility.       
- CSS requires refactoring for clarity and removal of duplication.      