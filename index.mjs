import { $, $1, $el, $url } from './util.mjs'

const searchDoesntWork = new Audio('./assets/search-doesnt-work.ogg')
const joinPleaseAudio = new Audio('./assets/please-join.ogg')
joinPleaseAudio.loop = true

//document.title = '👁️👄👁️ 𝗙𝗢𝗥𝗣𝗥𝗜𝗫'
const defaultTitle = 'Forprix'

document.title = defaultTitle

let pages

// Location Navigation Function
const switchBodyPage = (() => {
    const headerTitleEl = $1('.header-title')
    const menuTitleEl = $1('.menu-title-text')

    const iframe = $1('.body > .body-iframe')

    iframe.addEventListener('load', () => {
        const path = iframe.contentWindow.location.pathname.replace(/\/$/, '')
        const page = pages.find(x => x.path == path)
        if (page) {
            headerTitleEl.innerHTML = `FORPRIX /&nbsp;<div style="color:${page.color}">${page.name.toUpperCase()}</div>`
            menuTitleEl.innerHTML = `FORPRIX /&nbsp;<div style="color:${page.color}">${page.name.toUpperCase()}</div>`
        }
        const href = iframe.contentWindow.location.href
        const titleEl = iframe.contentDocument.querySelector('head > title')
        document.title = titleEl?.innerText ?? 'Forprix'
        history.replaceState(href, href, href)
    })
    return function(url) {
        return new Promise(res => {
            $1('.menu').classList.remove('open')
            
            if (iframe.src && $url(iframe.src) == $url(url))
                return

            $('.menu-location-selected').forEach(el => el.classList.remove('menu-location-selected'))
            const menuLocationEl = $1(`.menu-location[data-path="${url}"]`)
            if (menuLocationEl)
                menuLocationEl.classList.add('menu-location-selected')
        
            const listener = () => {
                $1('.body').classList.remove('loading')
                res()
                iframe.removeEventListener('load', listener)
                iframe.removeEventListener('error', listener)
            }
            iframe.addEventListener('load', listener)
            iframe.addEventListener('error', listener)
            $1('.body').classList.add('loading')
            iframe.src = url
        })
    }
})()

// Locations
;(async () => {

    pages = await (await fetch('locations.json')).json()

    let pageChosen = false
    
    const queryPath = (new URL(document.location)).searchParams.get('path')
    if (queryPath) {
        switchBodyPage(`/${queryPath}`)
        pageChosen = true
    }
    if (!pageChosen) {
        const url = localStorage.getItem('path')
        if (url) {
            switchBodyPage(url)
            pageChosen = true
        }
    }

    if (!pageChosen)
        switchBodyPage(pages.find(x => x.main).path)

    const menuLocationsEl = document.querySelector('.menu-locations')
    for (const page of pages) {
        const el = $el('div', {
            content: 'FORPRIX /\u00A0',
            class: 'menu-location',
            data: { path: page.path },
            child: $el('div', {
                content: page.name.toUpperCase(),
                style: { color: page.color }
            })
        })
        el.addEventListener('click', () => switchBodyPage(el.getAttribute('data-path')))
        el.addEventListener('auxclick', (e) => {
            if (e.button == 1) {
                open(el.getAttribute('data-path'))
                e.preventDefault()
            }
        })
        menuLocationsEl.append(el)
    }
})()

addEventListener('beforeunload', () => {
    const selectedLocationEl = $1(`.menu-location-selected`)
    if (selectedLocationEl)
        localStorage.setItem('path', selectedLocationEl.getAttribute('data-path'))
})

// Menu
{
    const menu = $1('.menu')
    $('.menu-button').on('click', () => {
        if (menu.classList.contains('open'))
            menu.classList.remove('open')
        else
            menu.classList.add('open')
    })

    const iframeEl = $1('.body > .body-iframe')
    const menuEl = $1('.menu')

    iframeEl.addEventListener('load', () =>
        iframeEl.contentDocument.addEventListener('mousedown', () =>
            menuEl.classList.remove('open')
        )
    )

    // Menu Bottom Media Buttons
    {
        $('.menu-bottom-media-discord').on('click', () => open('https://discord.gg/885muca', 'forprix-discord'))
        $('.menu-bottom-media-soundcloud').on('click', () => open('https://soundcloud.com/forprix', 'forprix-soundcloud'))
        $('.menu-bottom-media-github').on('click', () => open('https://github.com/Forprix', 'forprix-github'))
        $('.menu-bottom-media-youtube').on('click', () => open('https://www.youtube.com/@forprix', 'forprix-youtube'))
    }
}

// Header 
{
    // Header Discord Button
    {
        const el = $1('.discord-button')
        el.addEventListener('click', () => window.open('https://discord.gg/885muca', 'Discord'))
        setInterval(() => {
            if (e)
                el.style = `transform: scale(1.4) translate(${Math.floor(Math.random() * 20 - 10)}px, ${Math.floor(Math.random() * 20 - 10)}px)`
            else
                el.style = ``
        }, 1000 / 60)
        let e = false
        el.addEventListener('mouseleave', () => {
            e = false
            joinPleaseAudio.pause()
        })
        let ready = false
        addEventListener('mousedown', () => ready = true)
        addEventListener('keydown', () => ready = true )
        el.addEventListener('mouseenter', () => {
            e = true
            if (ready)
                joinPleaseAudio.play()
        })
    }
    
    // Header Search Bar
    {
        document.querySelector('.search-bar-button').addEventListener('click', () => {
            searchDoesntWork.currentTime = 0
            searchDoesntWork.play()
        })
    
        const input = document.querySelector('.search-bar-input')
        input.addEventListener('keypress', (evt) => {
            if (evt.code == 'Enter') {
                evt.preventDefault();
            }
        })
        input.addEventListener('input', () => {
            document.querySelector('.body .body-iframe').contentWindow.postMessage({
                type: 'search',
                data: input.innerText
            }, '*')
            if (input.innerText == '') {
                document.querySelector('.search-bar-placeholder').style = ''
            }
            else {
                document.querySelector('.search-bar-placeholder').style = 'display: none;'
            }
        })
    }
}
