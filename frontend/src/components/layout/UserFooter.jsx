const UserFooter = () => (
   <footer className="p-6 bg-white text-sm text-gray-700 w-full">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h3 className="font-bold mb-2">HEALTHY EATING</h3>
        <p>Your go-to meal planner for a healthier life.</p>
      </div>

      <div>
        <h3 className="font-medium mb-2">Connect with us</h3>
        <ul className="space-y-1">
          <li><a className="link link-hover" href="#">Facebook</a></li>
          <li><a className="link link-hover" href="#">Instagram</a></li>
          <li><a className="link link-hover" href="#">LinkedIn</a></li>
        </ul>
      </div>

      <div>
        <h3 className="font-medium mb-2">Explore</h3>
        <div className="grid grid-cols-2 gap-4">
          <ul className="space-y-1">
            <li><a className="link link-hover" href="#">Get support</a></li>
            <li><a className="link link-hover" href="#">Join our community</a></li>
            <li><a className="link link-hover" href="#">Share your recipe</a></li>
            <li><a className="link link-hover" href="#">Sign up for tips</a></li>
          </ul>
          <ul className="space-y-1">
            <li><a className="link link-hover" href="#">Read success stories</a></li>
            <li><a className="link link-hover" href="#">Gift a meal plan</a></li>
            <li><a className="link link-hover" href="#">Explore nearby meals</a></li>
            <li><a className="link link-hover" href="#">Save on first meal</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);
export default UserFooter;
