<?php
	session_start();

	if (!$_SESSION['user']) {
        header('Location: ../auth.php');
    }
?>
<html>
<head>
	<title>АвтоКупи</title>
	<link href="style.css" rel="stylesheet">
	<link href="style_template.css" rel="stylesheet">
</head>
<body>
	<?php include 'template/header.php'; ?>
	<?php
		if ($_SESSION['message']) {
			echo '<p class="msg">' . $_SESSION['message'] . '</p>';
		}
		unset($_SESSION['message']);
	?> 
	<div id="output_information">
		<?php include 'include/all_posts.php';

		$count = ((int)mysqli_num_rows($all_posts)) / 5;
		$cur_page = $_GET['page'];

		if (!$cur_page) {
			$all_posts = mysqli_query($connect, "SELECT * FROM `posts` LIMIT 5");
		}
		else {
			$current_page = $cur_page * 5;
			$next_page = $cur_page + 5;
			$all_posts = mysqli_query($connect, "SELECT * FROM `posts` LIMIT $current_page, $next_page");
		}

		while ( $res = mysqli_fetch_assoc( $all_posts ) )
		{
			echo '<div class="post"><a href="' . $res['photo'] . '"><img src="template/watermark.php?image=' . $res['photo'] . '"></a>';

			echo '<div class="title"><div class="title_name">';
			echo $res['name']; echo '</div><br />';

			echo '<div class="title_description">';
			echo $res['descr']; echo '</div> <br />';

			echo '<div class="title_type">';
			echo $res['type_carcase']; echo '</div></div>';

			echo '<div class="cost"><div class="cost_num">Цена: ' . $res['cost'] . ' ₽</div><br /><div class="cost_author">';
			echo 'Автор: <a href="user.php?username=' . $res['author'] . '">';
			echo $res['author']; echo '</a></div></div></div>';
		}
		?>
	</div>
	<hr style="width: 70%; margin: auto;">
	<div id="pages">
		<?php
			for ($i=0; $i < $count; $i++)
			{
				if ($i == $cur_page)
				{
					echo '<a style="color: #000" href="index.php?page=' . $i . '">' . $i+1 . '</a>';
				}
				else
				{
					echo '<a href="index.php?page=' . $i . '">' . $i+1 . '</a>';
				}
			}
		?>
	</div>
	<?php include 'template/footer.php'; ?>
</body>
</html>
