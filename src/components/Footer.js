export default function Footer() {
  const Today  = new Date(); 
  return (
    <footer>
      <p className = "footer"> Copyright &copy; {Today.getFullYear()}</p>
    </footer>
  )
}