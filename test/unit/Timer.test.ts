import './component/MyTimer'

describe('shadow element test', () => {
    before(() => {
        const elem = document.createElement('my-timer')
        elem.setAttribute('duration', '7')
        document.body.appendChild(elem)
    })

    it('fetch shadow elements', () => {
        console.log('write tests here...')
    })
})