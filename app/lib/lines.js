import { Expr, Callable } from 'tuber'

export const freezeLines = lines => {
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
}

export const restoreLines = items => {
  return items.map(item => {
    switch (item.type) {
      case 'EvalSequence':
        return {
          ...item,
          sequence: item.sequence.map(archive => Expr.restore(archive))
        }

      case 'Defined':
      case 'Found':
        return {
          ...item,
          body: Callable.restore(item.body)
        }

      case 'Deleted':
      case 'Undefined':
      case 'Void':
      case 'ParseError':
        return item
    }
  })
}
