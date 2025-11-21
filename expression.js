// An openfn job expression

export const myfn = () => "hello joe";

fn(() => {
  return {
    data: myfn(),
  };
});
