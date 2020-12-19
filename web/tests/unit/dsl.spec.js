import Interpreteur from '../../src/components/DSL/Interpreteur'
import { mount } from '@vue/test-utils'
import DSL from "../../src/components/DSL/DSL";


describe('Tests DSL guidage', () => {
    it('empty text by default', async () => {
        const wrapperInterpreteur = mount(Interpreteur)
        const text = wrapperInterpreteur.find('span')
        expect(text.text()).toContain('')

    });

    it('send data to Interpreteur', async () => {
        const wrapperDSL = mount(DSL);
        await wrapperDSL.find('#launch').trigger("click");
        expect(wrapperDSL.emitted().launch[0][0]).toStrictEqual([])
    });

    it('display error message if empty program', async () => {
        const wrapper = mount(Interpreteur);
        const wrapperDSL = wrapper.findComponent(DSL);
        await wrapperDSL.vm.$emit('launch', []);
        expect(wrapper.html()).toContain("Programme vide")
    });

    it('display error message if "Alors" without "Si"', async () => {
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

    it('display error message if "SI" without "Alors"', async () => {
        const wrapper = mount(Interpreteur);
        const wrapperDSL = wrapper.findComponent(DSL);
        await wrapperDSL.vm.$emit('launch', [{
            id: 1,
            title: 'Si',
            input: '',
            position: -1,
            type: 1,
            list: 1
        }]);
        expect(wrapper.html()).toContain("Programme inconnu")
    });

    it('display error message if "citoyens" without "nombre"', async () => {
        const wrapper = mount(Interpreteur);
        const wrapperDSL = wrapper.findComponent(DSL);
        await wrapperDSL.vm.$emit('launch', [
            {id: 1, title: "Si", input: "", position: 2, type: 1, list: 1},
            {id: 4, title: "citoyens", position: 3, type: 3, list: 2},
            {id: 5, title: "Zone A", position: 4, type: 4, list: 2},
            {id: 8, title: "Plus grand que", position: 5, type: 1, list: 2},
            {id: 2, title: "Alors", position: 6, type: 1, list: 2},
        ]);

        expect(wrapper.html()).toContain("Il faut donner un nombre après la case 'citoyens")
    });

    it('display error message if "fermeture"  without "heure"', async () => {
        const wrapper = mount(Interpreteur);
        const wrapperDSL = wrapper.findComponent(DSL);
        await wrapperDSL.vm.$emit('launch', [
            {id: 0, title: "Pour tous", input: "", position: 2, type: 1, list: 2},
            {id: 13, title: "magasins", position: 3, type: 3, list: 2},
            {id: 14, title: "fermeture", position: 4, type: 4, list: 2}
        ]);

        expect(wrapper.html()).toContain("Il faut donner une heure de fermeture")
    });

    it('display error message if "fermeture"  without "heure"', async () => {
        const wrapper = mount(Interpreteur);
        const wrapperDSL = wrapper.findComponent(DSL);
        await wrapperDSL.vm.$emit('launch', [
            {id: 0, title: "Pour tous", input: "", position: 2, type: 1, list: 2},
            {id: 13, title: "magasins", position: 3, type: 3, list: 2},
            {id: 14, title: "fermeture", position: 4, type: 4, list: 2},
            {id: 7, title: "Input", input: "30", position: 5, type: 5, list: 2},
            {id: 12, title: "heures", position: 6, type: 4, list: 2}
    ]);

        expect(wrapper.html()).toContain("Le nombre donné n'est pas une heure")
    });

});

