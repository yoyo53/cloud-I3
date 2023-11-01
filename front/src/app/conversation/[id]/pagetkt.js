import ChatClient from './client'; // Assurez-vous que le chemin du fichier est correct

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = await fetch(`${process.env.ROOTAPI}/conversations/getconversations`).then((res) => res.json())
  console.log(posts)
  const staticParams = posts.map((post) => ({
    id: post.id.toString(), // Convertir l'id en chaîne si nécessaire
  }));
  return staticParams;
}


export default function Page({ params }) {
  
  
  
  return (
    <div>
      <h1>Chat with {params.id}</h1>
      <ChatClient conversationId={params.id} /> {/* Ajoutez votre composant client ici */}
    </div>
  );
}
