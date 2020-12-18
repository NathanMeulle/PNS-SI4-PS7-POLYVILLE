import Interpreteur from '../../src/components/DSL/Interpreteur'
import { mount } from '@vue/test-utils'
import DSL from "../../src/components/DSL/DSL";

describe('Tests DSL', () => {
    it('empty text by default', async ()=> {
        const wrapperInterpreteur = mount(Interpreteur)
        const text = wrapperInterpreteur.find('span')
        expect(text.text()).toContain('')

    });

    it('send data to Interpreteur', async ()=> {
        const wrapperDSL = mount(DSL);
        await wrapperDSL.find('#launch').trigger("click");
        expect(wrapperDSL.emitted().launch[0][0]).toStrictEqual([])
    });

    it('display error message if empty program', async ()=> {
        const wrapper = mount(Interpreteur);
        const wrapperDSL = wrapper.findComponent(DSL);
        await wrapperDSL.vm.$emit('launch',[]);
        expect(wrapper.html()).toContain("Programme vide")
    });

    it('display error message if "Alors" without "Si"', async ()=> {
        const wrapper = mount(Interpreteur);
        const wrapperDSL = wrapper.findComponent(DSL);
        await wrapperDSL.vm.$emit('launch', [{
            id: 2,
            title: 'Alors',
            position: -1,
            type: 1,
            list: 1
        }]);
        expect(wrapper.html()).toContain("Il est nécessaire de mettre une case")
    });
});

