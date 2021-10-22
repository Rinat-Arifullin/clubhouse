import Link from "next/link";

export default function TestPage() {
  return (
    <h1>
      Это тестовая страница. <Link href="/">Перейти на главную</Link>
    </h1>
  );
}
