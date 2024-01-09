export const useQuery = () => {
  const pages = useRoute().params.query

  return {
    page : pages[0],
    sub : pages[1],
    target : pages[2],
  }

}