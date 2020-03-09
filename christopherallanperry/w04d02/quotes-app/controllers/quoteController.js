let quotes = require('../data/quotes');

function quotesIndex( req, res ) {
  res.render( 'quotes/index', { quotes } );
}

function quotesNew( req, res ) {
  res.render( 'quotes/new' );
}

function quotesCreate( req, res ) {
  let quote = req.body.quote;
  quote.quote_id = quotes.length;
  quotes.push( quote );
  res.redirect(302, '/quotes' );
}

function quotesShow(req, res) {
  const id = parseInt(req.params.id);
  const quote = quotes[id];
  res.render('quotes/show', { quote });
}

function quotesEdit(req, res) {
  const id = parseInt(req.params.id);
  res.render('quotes/edit', { quote: quotes[id] });
}

function quotesUpdate(req, res) {
  const id = parseInt(req.params.id);
  let quote = req.body.quote;
  quote.id  = id;
  quotes[id] = quote;
  res.redirect(302, `/quotes/${id}`);
}

function quotesDelete(req, res) {
  const id = req.params.id;
  quotes.splice(id, 1);
  quotes = quotes.map(quote => {
    quote.id--;
    return quote;
  });
  res.redirect(302, '/');
}

module.exports = {
  index: quotesIndex,
  new: quotesNew,
  create: quotesCreate,
  show: quotesShow,
  edit: quotesEdit,
  update: quotesUpdate,
  delete: quotesDelete
};
