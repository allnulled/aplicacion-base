(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCommandFormInterface'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCommandFormInterface'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtCommandFormInterface = {
    name: "NwtCommandFormInterface",
    extends: NwtCommandContextInterface,
    props: {},
    data() {
      trace("NwtCommandFormInterface.data");
      return {
        questions: []
      };
    },
    methods: {
      async loadQuestions() {
        trace("NwtCommandFormInterface.methods.loadQuestions");
        const questions = await NwtImporter.asyncSource(this.command.resolve("questions.js"));
        this.questions = questions;
      }
    },
    created() {},
    async mounted() {
      trace("NwtCommandFormInterface.mounted");
      await this.loadQuestions();
    },
  };

  return NwtCommandFormInterface;

});