export default (context, inject) => {
  inject('freezeLines', lines => {
    return lines.map(line => {
      switch (line.type) {
        case 'EvalSequence':
          return {
            ...line,
            sequence: line.sequence.map(expr => expr.dump())
          }

        case 'Defined':
        case 'Found':
          return {
            ...line,
            body: line.body.dump()
          }

        case 'Deleted':
        case 'Undefined':
        case 'Void':
        case 'ParseError':
          return line
      }
    })
  })
}
