describe("i18n", () => {
  beforeEach(() => {
    jest.resetModules()
  });

  const languageGetter = jest.spyOn(window.navigator, 'language', 'get')
  
  test('Should return the correct message for en-US', () => {
    languageGetter.mockReturnValue('en-US')
    return import('../src/i18n').then(i18n => {
      expect(i18n.default("NameShouldBeUpTo4CharsLong")).toEqual("Choose a name up to 4 chars long.")
    })
  })

  test('Should return the correct message for pt-BR', () => {
    languageGetter.mockReturnValue('pt-BR')
    return import('../src/i18n').then(i18n => {
      expect(i18n.default("NameShouldBeUpTo4CharsLong")).toEqual("Escolha um nome com até 4 caracteres.")
    })
  })

  test('Should return the DEFAULT message for xx-ZZ', () => {
    languageGetter.mockReturnValue('xx-ZZ')
    return import('../src/i18n').then(i18n => {
      expect(i18n.default("NameShouldBeUpTo4CharsLong")).toEqual("Choose a name up to 4 chars long.")
    })
  })

  test('Messages should accept params for string interpolation', () => {
    return import('../src/i18n').then(i18n => {
      expect(i18n.default("NumOfPlayerInRoom", 4)).toEqual("Players in room: 4 of 6.",)
    })
  })

  test('Shoould return "no message defined" when no message has been defined for the required id', () => {
    return import('../src/i18n').then(i18n => {
      expect(i18n.default("MESSAGE_NOT_DEFINED")).toEqual("i18n: no message defined")
    })
  })

  test('setMessage Should throw an error when not all langs are being set', () => {
    return import('../src/i18n').then(({setMessage}) => {
      const msgId = "NameShouldBeUpTo4CharsLong"
      const expectedErrorMsg = `The definitions for '${msgId}' must be provided for every language.`
      expect(() => setMessage(msgId, 'a')).toThrowError(expectedErrorMsg);
    })
  })

})