import Interpreteur from '../../src/components/DSL/Interpreteur'
import { mount } from '@vue/test-utils'

test('empty text by default', () => {
    const wrapperInterpreteur = mount(Interpreteur)
    const text = wrapperInterpreteur.find('span')

    expect(text.text()).toContain('')
})
